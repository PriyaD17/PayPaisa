const {JWT_SECRET} =require("./config");
const jwt= require("jsonwebtoken")
const authMiddleware= (req,res,next)=>{
    authHeader= req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer')){
        return res.status(403).json({});
    }
    const token= authHeader.split("")[1];

    try{
        const ver= jwt(token, JWT_SECRET);
        req.userid= ver.userid;

        next();
    }catch (err){
       return res.status(403).json({});
    };
}

module.exports={
    authMiddleware
}