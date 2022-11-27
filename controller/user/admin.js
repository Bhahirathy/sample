const express=require("express")
const router=express.Router()
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
const admin=require("../../Models/userModel/adminModel")
const {generatePasswordHash}=require("../../utility")
router.post("/register",(req, res) => {
    console.log(req.body.password)
    generatePasswordHash(req.body.password).then((passwordHash) => {
        console.log(passwordHash)
        admin.create({
            username:req.body.username,
            email: req.body.email,
            password: passwordHash,
            
        }).then(() => {
                res.status(200).send(`${req.body.email} added successfully`);
            }).catch((err) => {
                console.log(err);
                res.status(400).send(err.message)
            })
    });

});
router.post("/login", (req, res)=> {
admin.find({email: req.body.email}).then((userData)=> {
    console.log(userData)
        bcrypt.compare(req.body.password, userData[0].password).then((val)=> {
            if(val) {
                const authToken = jwt.sign(userData[0].email, process.env.SECRET_KEY);
                res.status(200).send({authToken});
            } else {
                res.status(400).send("Invalid Password");
            }
        })

})
});
module.exports=router