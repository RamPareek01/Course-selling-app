console.log("✅ script.js is loaded");

const API = "http://localhost:3000/api/v1";

// ✅ User Signup
const userSignup = document.getElementById("user-signup");
if (userSignup) {
  userSignup.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const FirstName = document.getElementById("FirstName").value;
    const LastName = document.getElementById("LastName").value;

    try {
      const res = await fetch(`${API}/user/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, FirstName, LastName }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Signup successful!");
        window.location.href = "index.html";
      } else {
        alert(data.message || "Signup failed");
      }
    } catch (err) {
      console.error("Signup error:", err);
      alert("Something went wrong");
    }
  });
}

// ✅ User Login
const userLogin = document.getElementById("user-login");
if (userLogin) {
  userLogin.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("user-email").value;
    const password = document.getElementById("user-password").value;

    try {
      const res = await fetch(`${API}/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        alert("User logged in!");
        window.location.href = "courses.html";
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert("Something went wrong.");
    }
  });
}

// ✅ Show All Courses
const coursesContainer = document.getElementById("courses-container");
if (coursesContainer) {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("Please log in first");
    window.location.href = "index.html";
  } else {
    fetch(`${API}/course/preveiw`)
      .then((res) => res.json())
      .then((data) => {
        const courses = data.courses || [];
        coursesContainer.innerHTML = "";

        courses.forEach((course) => {
          const card = document.createElement("div");
          card.className = "course-card";
          card.innerHTML = `
            <img src="${course.imageurl}" alt="${course.title}" />
            <h3>${course.title}</h3>
            <p>${course.description}</p>
            <p>₹${course.price}</p>
            <button onclick="purchaseCourse('${course._id}')">Buy Now</button>
          `;
          coursesContainer.appendChild(card);
        });
      })
      .catch((err) => {
        console.error("Error fetching courses:", err);
        coursesContainer.innerHTML = "Failed to load courses.";
      });
  }
}

// ✅ Buy Course
async function purchaseCourse(courseId) {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("You must be logged in to purchase.");
    return (window.location.href = "index.html");
  }

  try {
    const res = await fetch(`${API}/course/purchase`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
      body: JSON.stringify({ courseId }),
    });

    const data = await res.json();
    if (res.ok) {
      alert("Course purchased!");
      window.location.href = "purchases.html";
    } else {
      alert(data.message || "Purchase failed");
    }
  } catch (err) {
    console.error("Purchase error:", err);
    alert("Something went wrong during purchase");
  }
}

// ✅ Purchased Courses Page
const purchaseText = document.getElementById("purchase-msg");
if (purchaseText) {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("Please log in first");
    window.location.href = "index.html";
  } else {
    fetch(`${API}/user/purchase`, {
      headers: { token: token },
    })
      .then((res) => res.json())
      .then((data) => {
        purchaseText.innerText = data.message || "No purchases found.";
      })
      .catch((err) => {
        console.error("Purchase fetch error:", err);
        purchaseText.innerText = "Failed to load purchases.";
      });
  }
}

// ✅ Admin Signup
const adminSignup = document.getElementById("admin-signup");
if (adminSignup) {
  adminSignup.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("admin-email").value;
    const password = document.getElementById("admin-password").value;
    const FirstName = document.getElementById("admin-first").value;
    const LastName = document.getElementById("admin-last").value;

    const res = await fetch(`${API}/admin/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, FirstName, LastName }),
    });

    const data = await res.json();
    if (res.ok) {
      alert("Admin signed up!");
      window.location.href = "admin-login.html";
    } else {
      alert(data.message || "Signup failed");
    }
  });
}

// ✅ Admin Login
const adminLogin = document.getElementById("admin-login");
if (adminLogin) {
  adminLogin.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("admin-login-email").value;
    const password = document.getElementById("admin-login-password").value;

    const res = await fetch(`${API}/admin/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (res.ok) {
      localStorage.setItem("adminToken", data.token);
      alert("Admin logged in!");
      window.location.href = "admin-dashboard.html";
    } else {
      alert(data.message || "Login failed");
    }
  });
}

// ✅ Admin Create Course
const createCourse = document.getElementById("create-course-form");
if (createCourse) {
  createCourse.addEventListener("submit", async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("adminToken");
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const imageurl = document.getElementById("imageurl").value;
    const price = parseInt(document.getElementById("price").value);

    const res = await fetch(`${API}/admin/courses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
      body: JSON.stringify({ title, description, imageurl, price }),
    });

    const data = await res.json();
    if (res.ok) {
      alert("✅ Course created successfully!");
      createCourse.reset();
    } else {
      alert(data.message || "❌ Failed to create course");
    }
  });
}

