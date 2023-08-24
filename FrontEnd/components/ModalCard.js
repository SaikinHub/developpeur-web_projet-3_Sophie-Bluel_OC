import { addState, deleteState } from '../features/applyChanges.js';
import { createButton } from '../utils/createButton.js';
import { createElement } from '../utils/createElement.js';

export function modalCard(work) {
  const cardContainer = createElement('div', { id: 'card' });
  cardContainer.setAttribute('data-id', work.id);

  const imgContainer = createElement('div', { id: 'card__image-container' });

  const imgElement = createElement('img', {
    id: 'card__image',
    src: work.imageUrl,
    alt: work.title,
    loading: 'lazy',
  });

  const moveIcon = createElement('i', {
    id: 'card__move-icon',
    class: 'fa-arrows-up-down-left-right fa-xs fa-xs fa-solid',
  }); // font awesome settings

  const deleteIcon = createElement('i', {
    id: 'card__trash-icon',
    class: 'fa-xs fa-solid fa-trash-can',
  }); // font awesome settings

  deleteIcon.addEventListener('click', (e) => {
    // if the work to delete is just temporarily saved it's simply deleted from addState

    if (work.isUnstaged) {
      addState.delete(work);
      const imgContainer = e.target.parentElement;
      imgContainer.parentElement.remove();
    } else {
      deleteState.add(work.id);
      document.querySelector(`[data-id="${work.id}"]`).remove();
    }
  });

  const editButton = createButton('card__edit-btn', 'éditer', undefined);

  imgContainer.appendChild(imgElement);
  imgContainer.appendChild(moveIcon);
  imgContainer.appendChild(deleteIcon);

  cardContainer.appendChild(imgContainer);
  cardContainer.appendChild(editButton);

  return cardContainer;
}
