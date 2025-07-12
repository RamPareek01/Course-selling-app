const {Router, request}=require("express")
const adminRouter=Router()
const {adminModel, courseModel}=require("../db")
const jwt=require("jsonwebtoken")
const {JWT_ADMIN}=require("../config")
const { adminMiddleware } = require("../middlewares/admin")
adminRouter.post("/signup", async function(req,res){
   const email=req.body.email
       const password=req.body.password
       const FirstName=req.body.FirstName
       const LastName=req.body.LastName
       await adminModel.create({
           email,
           password,
           FirstName,
           LastName
       })
       res.json({
           message:"you are signedup"
       })
})
adminRouter.post("/login", async function(req,res){
    const email=req.body.email
       const password=req.body.password
        const user =await adminModel.findOne({
           email:email,
           password:password
       })
       if(user){
          const token= jwt.sign({
               id:user._id
           },JWT_ADMIN)
           res.json({
               token:token
           })
   
       }
       else{
           res.status(403).json({
               message:"incorrect credential"
           })
       }
})
adminRouter.post("/courses", adminMiddleware, async function (req, res) {
  const adminId = req.adminid;
  const { title, description, imageurl, price } = req.body;

  try {
    const course = await courseModel.create({
      title,
      description,
      imageurl,
      price,
      creatorId: adminId,
    });

    res.json({
      message: "Course created",
      courseId: course._id,
    });
  } catch (error) {
    console.error("Error creating course:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

adminRouter.put("/courses",adminMiddleware,async function (req,res){
    const adminId=req.adminid
    const{title,description,imageurl,price}=req.body
    await courseModel.updateOne({
        _id:courseId,
        courseId:adminId
    },{
        title,description,imageurl,price
    })
    res.json({
        message : "course updated",
        courseId:course._id
    })
})
module.exports ={
    adminRouter: adminRouter
}