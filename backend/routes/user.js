const express= require('express');

const router= express.Router();
const zod= require("zod");
const User= require("../db");
const jwt= require("jsonwebtoken");
const { JWT_SECRET} = require("../config");

const signupAuth= zod.object({
    username: zod.string().email(),
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string()
});

router.post("/signup",async(req,res)=>{
    const success= signupAuth.safeParse(req.body)
    const existinguser= await User.findOne({
        username: req.body.username
    })

    if((!success)|| existinguser){
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }

    const user= User.create({
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password,
    })
    const userid= user._id;

    const token= jwt.sign({
        userid
    }, JWT_SECRET);

    res.json({
        message:"User Created Successfully",
        token: token
    })
})
module.exports = router;