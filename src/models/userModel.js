import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username :{
        type: String,
        required: [true , 'Please enter a username'],
        unique: true
    } , 
    email : {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true
    } ,
    password : {
        type: String,
        required: [true, 'Please enter a password'],
        unique: true
    } ,
    followers : {
        type : [String] ,
        default : []
    } , 
    following  :{
        type : [String] ,
        default : []
    } ,

    about : {
        type: String ,
        default: ""
    } ,

    isVerified : {
        type: Boolean,
        default: false
    } ,

    forgotPasswordToken : String ,
    forgotPasswordTokenExpiry : Date ,
    verifyToken : String ,
    verifyTokenExpiry : Date ,
})

const User = mongoose.models.users || mongoose.model("users" , userSchema)

export default User;