import { fetchWork } from './fetchWork.js';
// Vérifier si l'utilisateur est connecté grâce au token d'authentification

// Vérifier la condition selon laquelle un token existe dans le localStorage

// Si oui, afficher l'overlay supérieur + le bouton modifier et faire disparaître la fonction filtre dynamiquement par défaut

// Lorsque l'utilisateur clique sur le bouton modifier, générer la modale et son contenu dynamiquement

export function adminCtrl() {
  const overlayContainer = document.getElementById('dynamic-admin-overlay');
  const modifyBtnContainer = document.getElementById('dynamic-modify-btn');
  const loginBtn = document.querySelector('header ul > :nth-child(3) a');

  if (localStorage.getItem('token')) {
    loginBtn.textContent = 'Logout';
    const container = document.createElement('div');
    const icon = document.createElement('i');
    const paragraph = document.createElement('p');
    const button = document.createElement('button');

    icon.classList.add('fa-regular');
    icon.classList.add('fa-pen-to-square');
    paragraph.textContent = 'Mode édition';
    button.textContent = 'publier les changements';
    button.classList.add('overlay__publish-btn');

    container.appendChild(icon);
    container.appendChild(paragraph);
    overlayContainer.appendChild(container);
    overlayContainer.appendChild(button);

    modifyBtnContainer.innerHTML = `
    <button class="portfolio__modify-btn">
        <i class="fa-regular fa-pen-to-square"></i>
        modifier
    </button>
    `;
    const modifyBtn = document.querySelector('.portfolio__modify-btn');

    modifyBtn.addEventListener('click', () => {
      document
        .getElementById('dynamic-admin-modal')
        .classList.add('open-modal');
      modal();
    });
  }
}

export async function modal() {
  const modalContainer = document.getElementById('dynamic-admin-modal');
  const works = await fetchWork();
  modalContainer.innerHTML = `
  <div class="modal__wrapper">
      <div class="modal__header">
          <div class="modal__window-controllers">
              <i class="fa-lg fa-solid fa-xmark modal__close-icon"></i>
          </div>
          <h2 class="modal__title">Galerie photo</h2>
      </div>
      <div class="modal__body">
          <div id="modal__card-wrapper">
              <!-- dynamic content -->
          </div>
      </div>
      <div class="modal__footer">
          <div class="modal__btn-group">
              <button class="add-photo">Ajouter une photo</button>
              <button class="delete-photo">Supprimer la galerie</button>
          </div>
      </div>
  </div>
`;

  const modal = document.getElementById('dynamic-admin-modal');

  modal.addEventListener('click', () => {
    modal.classList.remove('open-modal');
  });

  const modalWrapper = document.querySelector('.modal__wrapper');
  modalWrapper?.addEventListener('click', (e) => {
    e.stopPropagation();
  });

  const closeBtn = document.querySelector('.modal__close-icon');

  closeBtn?.addEventListener('click', () => {
    document
      .getElementById('dynamic-admin-modal')
      .classList.remove('open-modal');
  });

  const cardWrapper = document.getElementById('modal__card-wrapper');
  cardWrapper.innerHTML = '';

  works.forEach((work) => {
    const container = document.createElement('div');
    const imgContainer = document.createElement('div');
    const img = document.createElement('img');
    const moveIcon = document.createElement('i');
    const closeIcon = document.createElement('i');
    const button = document.createElement('button');

    container.classList.add('card');
    imgContainer.classList.add('card__image-container');
    img.classList.add('card__image');
    img.src = work.imageUrl;
    img.alt = work.title;
    imgContainer.appendChild(img);
    moveIcon.classList.add(
      'card__move-icon',
      'fa-arrows-up-down-left-right',
      'fa-xs',
      'fa-xs',
      'fa-solid'
    );
    closeIcon.classList.add(
      'card__trash-icon',
      'fa-xs',
      'fa-solid',
      'fa-trash-can'
    );
    imgContainer.appendChild(moveIcon);
    imgContainer.appendChild(closeIcon);
    button.classList.add('card__btn');
    button.textContent = 'éditer';

    container.appendChild(imgContainer);
    container.appendChild(button);
    cardWrapper.appendChild(container);
  });
}
