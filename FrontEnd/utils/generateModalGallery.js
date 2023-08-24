import { fetchWorks } from '../services/fetchWorks.js';
import { modalCard } from '../Components/modalCard.js';

export async function generateModalGallery(arr) {
  const list = arr ?? (await fetchWorks());

  const root = document.getElementById('modal-body');

  const cards = document.createElement('div');
  cards.setAttribute('id', 'modal-cards');

  list.forEach((work) => {
    cards.appendChild(modalCard(work));
  });

  root.innerHTML = '';
  root.appendChild(cards);
}
