# 🎓 Course Selling App

A full-stack application for selling and purchasing online courses. Built with Node.js, Express, HTML, and CSS.

## 🚀 Features

### 👤 User Panel
- User signup and login
- View available courses
- Purchase courses
- See purchase history

### 🛠️ Admin Panel
- Admin signup and login
- Create new courses
- Update existing courses

## 💻 Tech Stack

- Frontend: HTML, CSS, JavaScript
- Backend: Node.js, Express
- Database: MongoDB (via Mongoose)

## 📁 Project Structure

Course-selling-app/
├── index.js # Main server file
├── db.js # MongoDB connection
├── config.js # Secret keys (moved to .env)
├── package.json
├── package-lock.json
├── .gitignore
├── .env.example # Template for environment variables
│
├── routers/
│ ├── user.js # User-related routes
│ ├── admin.js # Admin-related routes
│ └── course.js # Course-related routes
│
├── middlewares/
│ ├── user.js # Auth middleware for users
│ └── admin.js # Auth middleware for admins
│
└── public/
├── index.html # Landing page
├── style.css # Global styles
├── script.js # Frontend logic
├── courses.html # Course preview
├── purchases.html # User's purchases
├── user.html # User dashboard
├── user-login.html # User login page
├── admin.html # Admin dashboard
├── admin-login.html # Admin login page
└── admin-dashboard.html # Admin course panel

🙋 Author
Ram Pareek

GitHub: @rampareek01

LinkedIn: Ram Pareek

Email: heyram.exe@gmail.com

📜 License
This project is licensed under the MIT License.

✨ Future Improvements
Add Stripe/Paytm payment gateway

Add file upload for course images

Add email verification via OTP

Add ratings and reviews for courses

Improve UI with Tailwind or Bootstrap





