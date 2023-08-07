const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const infos = {
    email: e.target[0].value,
    password: e.target[1].value,
  };

  fetch('http://localhost:5678/api/users/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(infos),
  })
    .then(async (res) => {
      if (res.ok) {
        const resObject = await res.json();
        localStorage.setItem('token', resObject.token);
        location.replace('./index.html');
      } else {
        const problemMessage = document.querySelector('.problem');
        problemMessage.innerText = 'Le couple email/mdp est incorrect !';
      }
    })
    .catch((err) => {
      const problemMessage = document.querySelector('.problem');
      problemMessage.innerText =
        'Un problème est survenu, veuillez réessayer plus tard.';
    });
});

// Récupérer l'adresse e-mail et le mot de passe du formulaire

// Envoyer avec la méthode POST au bon endpoint

// Recueillir la réponse

// Rediriger vers l'accueil si la réponse est positive

// Afficher un message d'erreur si la réponse est négative
