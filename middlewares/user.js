const jwt =require("jsonwebtoken")
const {JWT_USER}=require("../config")
function userMiddleware(req,res,next){
    const token=req.headers.token
    const decoded=jwt.verify(token,JWT_USER)
    if(decoded){
        req.userid=decoded.id
        next()
    }else{
        res.status(403).json({
            message:"You are not loggedin"
        })
    }
}
module.exports={
    userMiddleware
}