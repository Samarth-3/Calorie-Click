const mongoose = require('mongoose');
const UserScheme = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    isAdmin:{
        type:Boolean,
        default:false,
    }
},
{timestamps:true} //for created at and updated at
);

module.exports = mongoose.model("User", UserScheme);