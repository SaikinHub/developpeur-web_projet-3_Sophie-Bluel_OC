import { createElement } from '../utils/createElement.js';

export function Card(work) {
  const figureElement = document.createElement('figure');

  const figcaptionElement = document.createElement('figcaption');
  figcaptionElement.innerText = work.title;

  const imgElement = createElement('img', {
    src: work.imageUrl,
    alt: work.title,
    loading: 'lazy',
  });

  figureElement.appendChild(imgElement);
  figureElement.appendChild(figcaptionElement);
  return figureElement;
}
