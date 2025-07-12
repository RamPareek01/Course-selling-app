const {Router}=require("express")
const courseRouter=Router()
const {userMiddleware} =require("../middlewares/user")
const {purchasemodel, courseModel}=require("../db")
courseRouter.get("/preveiw", async function (req, res) {
  const courses = await courseModel.find({});
  res.json({
    message: "All courses",
    courses: courses   
  });
});

courseRouter.post("/purchase",userMiddleware,async function(req,res){
    const userId=req.body.userId
    const courseId=req.body.courseId
    await purchasemodel.create({
        userId,
        courseId
    })
    res.json({
        message : "you can access this course now"
    })
})
module.exports ={
    courseRouter: courseRouter
}