const mongoose= require('mongoose');
const { number } = require('zod');
mongoose.connect("mongodb+srv://prixoplusplus:prixoplusplus@cluster0.2vzfcoa.mongodb.net/paytm");
const userSchema= new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minlen:3,
        maxlen: 30
    },
    password:{
        type:String,
        minlen: 8,
        required: true
    },
    firstName:{
        type: String,
        required: true,
        maxlen: 35,
        trim: true
    },
    lastName:{
        type:String,
        required: true,
        maxlen: 35,
        trim: true

    }
});
const userBalance= new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
});

const Account= mongoose.model('Account',userBalance);
const User= mongoose.model('User',userSchema);

module.exports={
    User,
    Account,
};