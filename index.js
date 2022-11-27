const express=require("express")
const mongoose=require("mongoose")
const dotenv=require("dotenv").config()
const SuperAdmin=require("./controller/user/superAdmin")
const Admin=require("./controller/user/admin")
const Course=require("./controller/course/course")
const app=express()
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use("/superAdmin",SuperAdmin)
app.use("/Admin",)
app.use("/course",Course)
mongoose.connect(process.env.MONGO_DB,(err)=>{
    if(!err){
        console.log("Database Connected");
    }else{
        console.log(err);
    }
})
app.listen(process.env.PORT,(err)=>{
    if(!err){
        console.log(`Port Connected on ${process.env.PORT}`);
    }else{
        console.log(err);
    }
})