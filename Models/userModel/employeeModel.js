const mongoose=require("mongoose")
const employeeModel=new mongoose.Schema({
    name:{
        type:String,
        required:true
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
const employeeSchema=mongoose.model("employee",employeeModel)
module.exports=employeeSchema