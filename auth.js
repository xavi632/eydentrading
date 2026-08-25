// Authentication helper for Eyden Trading
(function() {
  const publicPages = ['login.html', 'index.html'];
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  const appUsers = [
    { username: 'admin', password: 'xavemi77', name: 'Eyden Trading', role: 'Administrator', type: 'admin', avatar: 'ET' },
    { username: 'eyden trading', password: 'xavemi77', name: 'Eyden Trading', role: 'Administrator', type: 'admin', avatar: 'ET' },
    { username: 'worker', password: 'xavemi77', name: 'Worker', role: 'Worker', type: 'worker', avatar: 'W' }
  ];

  function isLoggedIn() {
    try {
      const session = localStorage.getItem('user_session');
      return session ? JSON.parse(session) : null;
    } catch (e) {
      return null;
    }
  }

  function getUsers() {
    try {
      const savedUsers = JSON.parse(localStorage.getItem('eyden_users') || 'null');
      return Array.isArray(savedUsers) && savedUsers.length ? savedUsers : appUsers;
    } catch (e) {
      return appUsers;
    }
  }

  function getUserByCredentials(username, password) {
    const normalizedUsername = String(username || '').trim().toLowerCase();
    const normalizedPassword = String(password || '');

    if (!normalizedUsername || !normalizedPassword) return null;

    return getUsers().find((user) => {
      const usernameMatches = [
        user.username,
        user.name,
        user.type,
        user.role
      ].some((entry) => String(entry || '').trim().toLowerCase() === normalizedUsername);

      return usernameMatches && user.password === normalizedPassword;
    }) || null;
  }

  function checkAuth() {
    const user = isLoggedIn();

    if (!user && !publicPages.includes(currentPage) && currentPage !== '') {
      window.location.href = 'login.html';
      return false;
    }

    if (user && currentPage === 'login.html') {
      window.location.href = 'index.html';
      return true;
    }

    if (user) {
      updateUserCard(user);
      updateHomeAuth(user);
    }

    return true;
  }

  function updateUserCard(user) {
    try {
      const avatarEl = document.querySelector('.avatar');
      const nameEl = document.querySelector('.user-card strong');
      const roleEl = document.querySelector('.user-card small');

      if (avatarEl) avatarEl.textContent = user.avatar || 'U';
      if (nameEl) nameEl.textContent = user.name || 'User';
      if (roleEl) roleEl.textContent = user.role || 'User';
    } catch (e) {
      // Ignore missing elements on pages without the dashboard card.
    }
  }

  function updateHomeAuth(user) {
    const loginButton = document.getElementById('home-login-button');
    const logoutButton = document.getElementById('logout-button');
    const userBadge = document.getElementById('home-user-badge');

    if (loginButton) loginButton.style.display = 'none';
    if (logoutButton) {
      logoutButton.hidden = false;
      logoutButton.textContent = `Logout · ${user.name}`;
    }
    if (userBadge) {
      userBadge.textContent = user.name;
      userBadge.hidden = false;
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', checkAuth);
  } else {
    checkAuth();
  }

  window.appUsers = appUsers;
  window.authHelper = {
    isLoggedIn: isLoggedIn,
    checkAuth: checkAuth,
    getCurrentUser: isLoggedIn,
    getUsers: getUsers,
    getUserByCredentials: getUserByCredentials,
    logout: function() {
      localStorage.removeItem('user_session');
      localStorage.removeItem('selected_customer');
      window.location.href = 'login.html';
    }
  };
})();
