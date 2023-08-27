import { fetchAllCategories } from '../services/fetchCategories.js';
import { generateModalGallery } from '../utils/generateModalGallery.js';
import { addState, deleteState } from '../features/applyChanges.js';
import { tempModalGalleryArray } from '../utils/tempModalGalleryArray.js';
import { createButton } from '../utils/createButton.js';
import { saveWork } from '../utils/saveWork.js';
import { createElement } from '../utils/createElement.js';

let isModalOpen = false;

export function toggleModal() {
  if (!isModalOpen) {
    const root = document.getElementById('admin-panel-root');

    /* =====MODAL HEADER===== */
    const headerContainer = createElement('div', { id: 'modal-header' });

    const closeCtrlIcon = createElement('i', { id: 'modal-close-btn' });
    closeCtrlIcon.classList.add(
      'fa-lg',
      'fa-solid',
      'fa-xmark'
    ); /* font awesome icon settings */
    closeCtrlIcon.addEventListener('click', () => {
      toggleModal();
    });

    const goBackCtrlIcon = createElement('i', { id: 'modal-go-back-btn' });
    goBackCtrlIcon.classList.add(
      'fa-lg',
      'fa-solid',
      'fa-arrow-left'
    ); /* font awesome icon settings */
    goBackCtrlIcon.addEventListener('click', () => {
      deletionModal();
    });

    const windowCtrlsContainer = createElement('div', {
      id: 'modal-control-btns',
    });

    windowCtrlsContainer.appendChild(goBackCtrlIcon);
    windowCtrlsContainer.appendChild(closeCtrlIcon);
    headerContainer.appendChild(windowCtrlsContainer);

    const heading = createElement('h2', { id: 'modal-title' });
    headerContainer.appendChild(heading);

    /* =====MODAL BODY===== */
    const bodyContainer = createElement('div', { id: 'modal-body' });

    /* =====MODAL FOOTER===== */
    const footerContainer = createElement('div', { id: 'modal-footer' });
    const buttons = createElement('div', { id: 'modal-buttons' });

    footerContainer.appendChild(buttons);

    // Closes the modal when it's clicked outside its content
    const modalContainer = createElement('div', { id: 'modal-root' });
    modalContainer.addEventListener('click', () => {
      toggleModal();
    });

    const modalWrapper = createElement('div', { id: 'modal-wrapper' });
    modalWrapper?.addEventListener('click', (e) => {
      e.stopPropagation();
    });

    // Injects eveything into the DOM
    modalWrapper.appendChild(headerContainer);
    modalWrapper.appendChild(bodyContainer);
    modalWrapper.appendChild(footerContainer);
    modalContainer.appendChild(modalWrapper);

    root.appendChild(modalContainer);

    // Loads the modal's main menu
    deletionModal();
    isModalOpen = true;
  } else {
    document.getElementById('modal-root').remove();
    isModalOpen = false;
  }
}

export async function deletionModal() {
  // This function only handles already existing elements created by toggleModal()

  /* =====MODAL HEADER===== */
  const modalWindowCtrls = document.getElementById('modal-control-btns');
  const goBackCtrl = document.getElementById('modal-go-back-btn');
  const heading = document.getElementById('modal-title');

  modalWindowCtrls.style.justifyContent = 'end';

  goBackCtrl.classList.toggle('hidden');

  heading.textContent = 'Galerie photo';

  /* =====MODAL BODY===== */
  if (deleteState.size === 0 && addState.size === 0) {
    // Executes normal behavior if the user didn't add nor delete anything
    generateModalGallery();
  } else {
    // Creates a custom gallery with both deleted and added work (to preview the new gallery before it's published)
    const customTempGallery = await tempModalGalleryArray();
    generateModalGallery(customTempGallery);
  }

  /* =====MODAL FOOTER===== */
  const footerButtonsContainer = document.getElementById('modal-buttons');
  footerButtonsContainer.innerHTML = '';

  const navigateButton = createButton(
    'modal-add-btn',
    'Ajouter une photo',
    uploadModal
  );
  const resetButton = createButton(
    'modal-delete-all-btn',
    'Supprimer la galerie',
    undefined
  );

  footerButtonsContainer.appendChild(navigateButton);
  footerButtonsContainer.appendChild(resetButton);
}

async function uploadModal() {
  // This function only handles already existing elements created by toggleModal()

  /* =====MODAL HEADER===== */
  const modalWindowCtrls = document.getElementById('modal-control-btns');
  const goBackCtrl = document.getElementById('modal-go-back-btn');
  const heading = document.getElementById('modal-title');

  modalWindowCtrls.style.justifyContent = 'space-between';

  goBackCtrl.classList.toggle('hidden');

  heading.textContent = 'Ajout photo';

  /* =====MODAL BODY===== */
  const modalBody = document.getElementById('modal-body');
  modalBody.innerHTML = `
    <form id="modal-form">
      <div>
        <label id="modal-image-container" for="modal-upload-input">
        <input id="modal-upload-input" class="modal__file-btn" name="image" type="file" name="file" accept="image/png, image/jpeg" required>
          <div id="modal-upload-preview">
            <div id="modal-upload-placeholder">
              <svg id="modal-image-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M448 80c8.8 0 16 7.2 16 16V415.8l-5-6.5-136-176c-4.5-5.9-11.6-9.3-19-9.3s-14.4 3.4-19 9.3L202 340.7l-30.5-42.7C167 291.7 159.8 288 152 288s-15 3.7-19.5 10.1l-80 112L48 416.3l0-.3V96c0-8.8 7.2-16 16-16H448zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm80 192a48 48 0 1 0 0-96 48 48 0 1 0 0 96z"/>
              </svg>
              <p id="modal-upload-add-btn">+ Ajouter photo</p>
              <p id="modal-upload-formats">jpg, png : 4mo max</p>
            </div>
          </div>
        </label>
      </div>
      <label for="modal-name" class="modal-label">Titre
        <input id="modal-name" class="modal-input" name="title" type="text" autocomplete="off" required/>
      </label>

      <label for="modal-category" class="modal-label">Catégorie
        <select id="modal-category" class="modal-input" name="category" autocomplete="off" required>
          <option></option>
        </select>
      </label>
    </form>
  `;

  const imageInput = document.getElementById('modal-upload-input');
  let validFile = false;

  let file = null;
  let type = null;
  let size = null;
  const acceptedTypes = ['image/jpeg', 'image/png', 'image/jpg'];

  imageInput.addEventListener('change', () => {
    file = imageInput.files[0];
    type = file?.type ?? undefined;
    size = file?.size < 4000000;

    validFile = acceptedTypes.includes(type) && size;

    if (validFile) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.addEventListener('load', function () {
        document.getElementById('modal-upload-preview').innerHTML = `
        <img id="modal-image-preview" src="${this.result}" />
        `;
      });
    }
  });

  const allCategories = await fetchAllCategories();
  const selectMenu = document.getElementById('modal-category');

  allCategories.forEach((category) => {
    const optionElement = document.createElement('option');
    optionElement.textContent = category.name;
    selectMenu.appendChild(optionElement);
  });

  /* =====MODAL FOOTER===== */
  const uploadForm = document.getElementById('modal-form');
  const nameInput = document.getElementById('modal-name');
  const categoryInput = document.getElementById('modal-category');

  const footerButtonsContainer = document.getElementById('modal-buttons');
  footerButtonsContainer.innerHTML = '';

  const sendWorkButton = createButton('modal-send-btn', 'Valider', saveWork);
  footerButtonsContainer.appendChild(sendWorkButton);

  uploadForm.addEventListener('input', () => {
    const isValid =
      validFile && nameInput.value !== '' && categoryInput.value !== '';

    if (isValid) {
      sendWorkButton.removeAttribute('disabled');
      sendWorkButton.classList.add('correct');
    } else if (sendWorkButton.classList.contains('correct')) {
      sendWorkButton.setAttribute('disabled', 'true');
      sendWorkButton.classList.remove('correct');
    }
  });
}
