const mongoose =require("mongoose")
mongoose.connect("mongodb+srv://ram404:Test1234@cluster0.jdadeww.mongodb.net/coursera?retryWrites=true&w=majority&authSource=admin")
const Schema=mongoose.Schema
const ObjectId=mongoose.Types.ObjectId
const userSchema= new Schema({
    email :{type:String, unique:true},
    password:String,
    FirstName:String,
    LastName:String
})
const adminSchema= new Schema({
    email:{type:String, unique:true},
    password:String,
    FirstName:String,
    LastName:String
})
const courseSchema=new Schema({
    title:String,
    description: String,
    price:Number,
    imageurl:String,
    creatorId:ObjectId

})
const purchaseSchema=new Schema({
    userId:ObjectId,
    courseId:ObjectId
})
const userModel=mongoose.model("user",userSchema)
const adminModel=mongoose.model("admin",adminSchema)
const courseModel=mongoose.model("course",courseSchema)
const purchaseModel=mongoose.model("purchase",purchaseSchema)
module.exports={
    userModel,
    adminModel,
    courseModel,
    purchaseModel
}