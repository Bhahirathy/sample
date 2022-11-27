const mongoose=require("mongoose")
const adminModel=new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    }
})
const AdminSchema=mongoose.model("Admin",adminModel)
module.exports=AdminSchema