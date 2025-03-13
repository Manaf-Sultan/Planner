document.addEventListener('DOMContentLoaded', () => {
  checkAuth(); // Redirect if not admin

  // Load user list
  const userList = document.getElementById('user-list');
  const users = JSON.parse(localStorage.getItem('users')) || [];
  
  users.forEach(user => {
    const card = `
      <div class="card mb-3">
        <div class="card-body">
          <h5>${user.name}</h5>
          <p>${user.email}</p>
          <p>Role: ${user.role}</p>
        </div>
      </div>
    `;
    userList.innerHTML += card;
  });
});
