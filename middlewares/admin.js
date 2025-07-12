const jwt =require("jsonwebtoken")
const {JWT_ADMIN}=require("../config")
function adminMiddleware(req,res,next){
    const token=req.headers.token
    const decoded=jwt.verify(token,JWT_ADMIN)
    if(decoded){
        req.adminid=decoded.id
        next()
    }else{
        res.status(403).json({
            message:"You are not loggedin"
        })
    }
}
module.exports={
    adminMiddleware
}