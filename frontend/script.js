const BASE_URL = "http://localhost:3000";

// =====================
// Sections
// =====================
const registerBox = document.getElementById("registerBox");
const loginBox = document.getElementById("loginBox");
const dashboard = document.getElementById("dashboard");

// Inputs
const regUsername = document.getElementById("regUsername");
const regPassword = document.getElementById("regPassword");
const loginUsername = document.getElementById("loginUsername");
const loginPassword = document.getElementById("loginPassword");

const regMsg = document.getElementById("regMsg");
const loginMsg = document.getElementById("loginMsg");

const imageFile = document.getElementById("imageFile");
const preview = document.getElementById("preview");
const uploadText = document.getElementById("uploadText");
const caption = document.getElementById("caption");

const generateBtn = document.querySelector(".primaryBtn");


// =====================
// Show Sections
// =====================
function showRegister() {
  registerBox.classList.add("active");
  loginBox.classList.remove("active");
  dashboard.classList.remove("active");

  clearMessages();
}

function showLogin() {
  loginBox.classList.add("active");
  registerBox.classList.remove("active");
  dashboard.classList.remove("active");

  clearMessages();
}

function showDashboard() {
  registerBox.classList.remove("active");
  loginBox.classList.remove("active");
  dashboard.classList.add("active");

  clearMessages();
}

function clearMessages() {
  regMsg.innerText = "";
  loginMsg.innerText = "";
}


// =====================
// Auto Login
// =====================
window.onload = () => {
  const token = localStorage.getItem("token");

  if (token) {
    showDashboard();
  } else {
    showLogin();
  }
};


// =====================
// REGISTER
// =====================
async function register() {

  const username = regUsername.value.trim();
  const password = regPassword.value.trim();

  if (!username || !password) {
    regMsg.innerText = "Please fill all fields";
    return;
  }

  try {
    const res = await fetch(`${BASE_URL}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();

    if (!res.ok) {
      regMsg.innerText = data.message || "Registration failed";
      return;
    }

    localStorage.setItem("token", data.token);
    showDashboard();

  } catch (err) {
    regMsg.innerText = "Server error";
  }
}


// =====================
// LOGIN
// =====================
async function login() {

  const username = loginUsername.value.trim();
  const password = loginPassword.value.trim();

  if (!username || !password) {
    loginMsg.innerText = "Please fill all fields";
    return;
  }

  try {
    const res = await fetch(`${BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
    body: JSON.stringify({ username, password })
    });

    const data = await res.json();

    if (!res.ok) {
      loginMsg.innerText = data.message || "Login failed";
      return;
    }

    localStorage.setItem("token", data.token);
    showDashboard();

  } catch (err) {
    loginMsg.innerText = "Server error";
  }
}


// =====================
// IMAGE PREVIEW
// =====================
imageFile.addEventListener("change", () => {

  const file = imageFile.files[0];
  if (!file) return;

  preview.src = URL.createObjectURL(file);
  preview.style.display = "block";
  uploadText.style.display = "none";

  caption.innerText = "";
});


// =====================
// UPLOAD POST
// =====================
async function uploadPost() {

  const file = imageFile.files[0];

  if (!file) {
    alert("Please select an image");
    return;
  }

  const token = localStorage.getItem("token");

  if (!token) {
    alert("Please login first");
    showLogin();
    return;
  }

  const formData = new FormData();
  formData.append("image", file);

  try {

    // Loading state
    generateBtn.innerText = "Generating...";
    generateBtn.disabled = true;

    const res = await fetch(`${BASE_URL}/api/posts/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData
    });

    const data = await res.json();

    if (!res.ok) {
      caption.innerText = data.message || "Upload failed";
      return;
    }

    // Show returned image
    preview.src = data.post.image;
    preview.style.display = "block";

    // Show caption
    caption.innerText = data.post.caption;

  } catch (err) {
    console.error(err);
    caption.innerText = "Something went wrong";
  } finally {
    generateBtn.innerText = "Generate Caption";
    generateBtn.disabled = false;
  }
}


// =====================
// LOGOUT
// =====================
function logout() {

  localStorage.removeItem("token");

  // reset UI
  preview.src = "";
  preview.style.display = "none";
  uploadText.style.display = "block";
  caption.innerText = "";

  showLogin();
}
