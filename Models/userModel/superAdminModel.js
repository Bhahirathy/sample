const mongoose=require("mongoose")
const superAdminModel= new mongoose.Schema({
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
const superAdminSchema=mongoose.model("SuperAdmin",superAdminModel)
module.exports=superAdminSchema