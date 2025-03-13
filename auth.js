// Add role-based checks and default admin
document.addEventListener('DOMContentLoaded', () => {
  // Create default admin if no users exist
  let users = JSON.parse(localStorage.getItem('users')) || [];
  if (users.length === 0) {
    const adminUser = {
      name: 'Admin',
      email: 'admin@site.com',
      password: 'admin123',
      role: 'admin'
    };
    users.push(adminUser);
    localStorage.setItem('users', JSON.stringify(users));
    console.log('Default admin created.');
  }
  checkAuth();
});

function checkAuth() {
  const user = JSON.parse(localStorage.getItem('loggedInUser'));
  if (!user) {
    window.location.href = 'login.html';
    return;
  }
  // Redirect admins to admin.html
  if (user.role === 'admin' && !window.location.href.includes('admin.html')) {
    window.location.href = 'admin.html';
  }
}

function login() {
  const email = document.getElementById('email')?.value.trim();
  const password = document.getElementById('password')?.value.trim();

  if (!email || !password) {
    alert("Please enter email and password.");
    return;
  }

  const users = JSON.parse(localStorage.getItem('users')) || [];
  const user = users.find(u => 
    u.email === email && 
    u.password === password
  );

  if (user) {
    localStorage.setItem('loggedInUser', JSON.stringify(user));
    if (user.role === 'admin') {
      window.location.href = 'admin.html';
    } else {
      window.location.href = 'dashboard.html';
    }
  } else {
    alert("Invalid credentials.");
  }
}

function signup() {
  // Only allow admin to create new users (optional)
  const user = JSON.parse(localStorage.getItem('loggedInUser'));
  if (!user || user.role !== 'admin') {
    alert("Only admins can create new users.");
    return;
  }
  // ... rest of signup code ...
}

// Auth Functions
function checkAuth() {
  const user = localStorage.getItem('loggedInUser');
  if (!user) {
    console.warn("User not authenticated. Redirecting to login.");
    window.location.href = 'login.html';
  }
  return user;
}

function logout() {
  localStorage.removeItem('loggedInUser');
  console.log("User logged out.");
  window.location.href = 'login.html';
}

function signup() {
  const name = document.getElementById('name')?.value.trim();
  const email = document.getElementById('email')?.value.trim();
  const password = document.getElementById('password')?.value.trim();

  if (!name || !email || !password) {
    console.error("Signup failed: Missing fields.");
    alert("Please fill all fields.");
    return;
  }

  const users = JSON.parse(localStorage.getItem('users')) || [];
  users.push({ name, email, password });
  localStorage.setItem('users', JSON.stringify(users));
  localStorage.setItem('loggedInUser', JSON.stringify({ name, email }));
  
  console.log("Signup successful. Redirecting to dashboard.");
  window.location.href = 'dashboard.html';
}

function login() {
  const email = document.getElementById('email')?.value.trim();
  const password = document.getElementById('password')?.value.trim();

  if (!email || !password) {
    console.error("Login failed: Missing credentials.");
    alert("Please enter email and password.");
    return;
  }

  const users = JSON.parse(localStorage.getItem('users')) || [];
  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
    localStorage.setItem('loggedInUser', JSON.stringify(user));
    console.log("Login successful. Redirecting to dashboard.");
    window.location.href = 'dashboard.html';
  } else {
    console.error("Login failed: Invalid credentials.");
    alert("Invalid email or password.");
  }
}

// Initial check
checkAuth();
