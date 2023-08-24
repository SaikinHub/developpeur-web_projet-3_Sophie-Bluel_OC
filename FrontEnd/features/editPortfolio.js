import { createElement } from '../utils/createElement.js';
import { createButton } from '../utils/createButton.js';
import { clearStateOpenModal } from '../utils/clearStateOpenModal.js';

export function editPortrait() {
  // Self portrait container
  const root = document.getElementById('portrait-container');

  const labelContainer = createElement('label', {
    id: 'hero__edit-btn-container',
    class: 'icon-group',
    for: 'hero__edit-btn',
  });

  const editButton = createButton('hero__edit-btn', 'modifier', undefined);

  const editIcon = createElement('i', { class: 'fa-regular fa-pen-to-square' });

  labelContainer.appendChild(editIcon);
  labelContainer.appendChild(editButton);

  root.appendChild(labelContainer);
}

export function editGallery() {
  // Gallery
  const root = document.getElementById('portfolio-title-wrapper');

  const labelContainer = createElement('label', {
    id: 'portfolio-edit-btn-container',
    class: 'icon-group',
    for: 'portfolio-edit-btn',
  });

  const editIcon = createElement('i', { class: 'fa-regular fa-pen-to-square' });

  const editButton = createButton(
    'portfolio-edit-btn',
    'modifier',
    clearStateOpenModal
  );

  labelContainer.appendChild(editIcon);
  labelContainer.appendChild(editButton);

  root.appendChild(labelContainer);
}
