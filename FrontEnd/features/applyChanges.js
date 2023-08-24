import { addOneWork } from '../services/addOneWork.js';
import { deleteOneWork } from '../services/deleteOneWork.js';
import { fetchWorks } from '../services/fetchWorks.js';
import { toggleModal } from '../modules/modal.js';
import { generateGallery } from '../utils/generateGallery.js';
import { createButton } from '../utils/createButton.js';
import { createElement } from '../utils/createElement.js';

export let deleteState = new Set();
export let addState = new Set();

export function ApplyChanges() {
  const root = document.getElementById('admin-panel-root');

  const wrapper = createElement('div', { id: 'panel-wrapper' });

  const iconContainer = createElement('div', { class: 'icon-group' });

  const modifyIcon = createElement('i', {
    class: 'fa-regular fa-pen-to-square',
  });
  const modifyText = document.createElement('p');
  modifyText.textContent = 'Mode édition';

  const updateBtn = createButton(
    'panel-publish-btn',
    'publier les changements',
    updatePortfolio
  );

  iconContainer.appendChild(modifyIcon);
  iconContainer.appendChild(modifyText);

  wrapper.appendChild(iconContainer);
  wrapper.appendChild(updateBtn);

  root.appendChild(wrapper);
}

async function updatePortfolio() {
  const token = JSON.parse(localStorage.getItem('token'));

  // Creates arrays from Set objects to make them iterable
  const deleteStateArray = Array.from(deleteState);
  const addStateArray = Array.from(addState);

  try {
    // Waits for all the requested actions to be completed before continuing
    const responses = await Promise.allSettled([
      ...deleteStateArray.map((workId) => deleteOneWork(workId, token)),
      ...addStateArray.map((inputs) => addOneWork(inputs, token)),
    ]);

    // Clears the pending changes state and fetch the updated gallery from the database to generate it in the DOM
    deleteState.clear();
    addState.clear();

    const updatedGallery = await fetchWorks();

    generateGallery(updatedGallery);

    // Closes the modal if it's open when the request is made
    const modal = document.getElementById('modal-root');
    if (modal) {
      toggleModal();
    }
  } catch (error) {
    console.error(error);
  }
}
