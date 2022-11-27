const express = require("express")
const multer=require("multer")
const adminSchema = require("../../Models/userModel/adminModel")
const courseSchema = require("../../Models/courseModel/courses")
const router = express.Router()
router.post("/createCourse", (req, res) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization;
        jwt.verify(token, process.env.SECRET_KEY, async function (err, decoded) {
            if (err) {
                res.status(500).json({
                    status: "failed",
                    message: "Not Authenticated"
                })
            }
            adminSchema.find({ email: decoded }).then((data) => {
                const userId=req.body._id
                console.log(userId)
                if (data.length) {
                    courseSchema.create({
                        title: req.body.title,
                        category: req.body.category,
                        name: req.body.name,
                        topic: req.body.topic,
                        description: req.body.description,
                        rating:0,
                        email: decoded
                    }).then((data) => {
                        res.status(200).send(`Success ${data} saved successfully`)
                    }).catch((err) => {
                        res.status(400).send(err)
                    })
                }
            })
        })
    } else {
        return res.status(500).json({
            status: "failed",
            message: "Invalid token"
        })
    }

})
router.get("/courses",(req,res)=>{
    if (req.headers.authorization) {
        const token = req.headers.authorization;
        jwt.verify(token, process.env.SECRET_KEY, async function (err, decoded) {
          if (err) {
            res.status(500).json({
              status: "failed",
              message: "Not Authenticated"
            })
          }
        adminSchema.find({email:decoded}).then((data)=>{
            if(data.length){
                courseSchema.find({}).then((data)=>{
                    res.status(200).send(data)
                })
            }
    }).catch((err)=>{
        res.status(200).send(err)
    })
        })
      } else {
        return res.status(500).json({
          status: "failed",
          message: "Invalid token"
        })
      }
   
})
const uploadVideo = (req,res)=>{
    const courseId = req.params.courseID;
    console.log(req.files);
    const videos  = req.files;
    let videoContent = []
    courseSchema.findOne({_id:courseId})
    .then(course=>{

        videos.forEach(video=>{
            let videoContentContainer = {
                videoUrl:null,
                usersWatched:[],
            }
            videoContentContainer.videoUrl = video.path;
            videoContent.push(videoContentContainer);
        })  
        console.log(videoContent);
        course.videoContent=videoContent;
        course.save()
        .then(result=>{
            res.status(200).json({message:"successfully saved the video"})
        })
    })
    .catch(err=>{
        console.log(err);
    })
} 
const VideofileStorage = multer.diskStorage({
    destination:(req,file,cb)=>{
      cb(null,'videos');
    },
    filename: (req,file,cb)=>{
      const currentDate= new Date();
      cb(null, currentDate.toDateString() +'-' + file.originalname)
    }
  })
  
  const VideofileFilter=(req,file,cb)=>{
    if(file.mimetype ==="video/mp4"){
      cb(null,true);
    }
    else {cb(null,false);
          console.log("wrong file type")}
  }
  const videoMulter=multer({storage:VideofileStorage,fileFilter:VideofileFilter}).any()
  router.post('/creator/videoUpload/:courseID',videoMulter,uploadVideo);
  module.exports=router