import { works } from '../app.js';
import { Card } from '../components/Card.js';

export async function generateGallery(arr) {
  const list = arr ?? works;

  // Deletes the gallery from the DOM if it already exist
  const prevGallery = document.getElementById('gallery-wrapper');
  if (prevGallery) {
    prevGallery.remove();
  }

  const root = document.getElementById('root');

  const gallery = document.createElement('div');
  gallery.setAttribute('id', 'gallery-wrapper');

  // Creates a formated list of projects from the given array
  list.forEach((item) => {
    gallery.appendChild(Card(item));
  });

  root.appendChild(gallery);
}
