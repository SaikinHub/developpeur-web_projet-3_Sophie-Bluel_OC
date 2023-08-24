import { fetchWorks } from './services/fetchWorks.js';
import { fetchCategories } from './services/fetchCategories.js';
import { generateGallery } from './utils/generateGallery.js';
import { generateCategories } from './utils/generateCategories.js';
import { ApplyChanges } from './features/applyChanges.js';
import { editPortrait, editGallery } from './features/editPortfolio.js';
import { logOut } from './features/logOut.js';

export const works = await fetchWorks();
export const set = fetchCategories();

const isAdmin = localStorage.getItem('token') ? true : false;

if (isAdmin) {
  generateGallery();
  editPortrait();
  editGallery();
  ApplyChanges();
  logOut();
} else {
  generateCategories();
  generateGallery();
}
