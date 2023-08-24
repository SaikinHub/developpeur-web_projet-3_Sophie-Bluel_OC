const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const inputs = {
    email: e.target[0].value,
    password: e.target[1].value,
  };

  fetch('http://localhost:5678/api/users/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(inputs),
  })
    .then(async (res) => {
      if (res.ok) {
        const resObject = await res.json();
        localStorage.setItem('token', JSON.stringify(resObject.token));
        location.replace('./index.html');
      } else {
        const errorField = document.getElementById('login-error-message');
        errorField.textContent = 'Le couple email/mdp est incorrect !';
      }
    })
    .catch((err) => {
      console.error(err);
      const errorField = document.getElementById('login-error-message');
      errorField.textContent =
        'Un problème est survenu, veuillez réessayer plus tard.';
    });
});
