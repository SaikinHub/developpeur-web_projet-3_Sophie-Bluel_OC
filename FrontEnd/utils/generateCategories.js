import { works, set } from '../app.js';
import { generateGallery } from './generateGallery.js';

export function generateCategories() {
  // Gets the DOM dynamic container
  const root = document.getElementById('root');

  const listElement = document.createElement('ul');
  listElement.setAttribute('id', 'categories-menu');

  // Creates a button element for each category and add an eventListener to them
  set.forEach(async (category) => {
    const itemElement = document.createElement('li');
    itemElement.textContent = category;

    if (category === 'Tous') {
      itemElement.addEventListener('click', () => {
        const allCategories = document.querySelectorAll('#categories-menu li');
        allCategories.forEach((category) => {
          if (category.classList.contains('active')) {
            category.classList.remove('active');
          }
        });
        itemElement.classList.add('active');
        generateGallery();
      });
    } else {
      itemElement.addEventListener('click', async () => {
        // Creates a custom list of works that matches the specified filter and send it to generateGallery()
        const customGallery = new Array();
        works.forEach((work) => {
          if (itemElement.textContent === work.category.name) {
            customGallery.push(work);
          }
        });
        generateGallery(customGallery);

        const allCategories = document.querySelectorAll('#categories-menu li');
        allCategories.forEach((category) => {
          if (category.classList.contains('active')) {
            category.classList.remove('active');
          }
        });
        itemElement.classList.add('active');
      });
    }

    listElement.appendChild(itemElement);
  });

  // Injects the new container into the DOM;
  root.appendChild(listElement);
}
