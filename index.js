require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
const mongoose = require("mongoose");

const { userRouter } = require("./routers/user");
const { courseRouter } = require("./routers/course");
const { adminRouter } = require("./routers/admin");

app.use(express.json());
app.use(express.static("public")); // ✅ this serves HTML/CSS/JS

app.use("/api/v1/user", userRouter);
app.use("/api/v1/course", courseRouter);
app.use("/api/v1/admin", adminRouter);

 async function main(){
    await mongoose.connect(process.env.MONGO_URL)
    app.listen(3000)
    console.log("Connected to");
    
}
main()

