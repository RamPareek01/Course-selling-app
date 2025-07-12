const {Router}=require("express")
const userRouter=Router()
const {userModel,purchaseModel}=require("../db")
const jwt=require("jsonwebtoken")
const {JWT_USER}=require("../config")
userRouter.post("/signup", async function(req, res) {
  const { email, password, FirstName, LastName } = req.body;

  try {
    await userModel.create({ email, password, FirstName, LastName });
    res.json({ message: "You are signed up" });
  } catch (err) {
    if (err.code === 11000) {
      res.status(409).json({ message: "Email already registered" });
    } else {
      res.status(500).json({ message: "Signup failed", error: err.message });
    }
  }
});

userRouter.post("/login", async function(req,res){
    const email=req.body.email
    const password=req.body.password
     const user =await userModel.findOne({
        email:email,
        password:password
    })
    if(user){
       const token= jwt.sign({
            id:user._id
        },JWT_USER)
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
userRouter.get("/purchase", async function(req,res){
    const userId=req.userId
    const purchases=await purchaseModel.find({
        userId
    })


    res.json({
        message : "you have the access of these courses"
    })
})
module.exports ={
    userRouter: userRouter
}