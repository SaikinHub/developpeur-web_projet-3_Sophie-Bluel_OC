export function logOut() {
  const root = document.getElementById('menu-log-cta');

  root.setAttribute('href', './login.html');
  root.textContent = 'Logout';

  root.addEventListener('click', () => {
    localStorage.removeItem('token');
  });
}
