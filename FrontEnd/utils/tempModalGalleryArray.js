import { addState, deleteState } from '../features/applyChanges.js';
import { fetchWorks } from '../services/fetchWorks.js';

export async function tempModalGalleryArray() {
  const works = await fetchWorks();
  const customModalGallery = works.filter((work) => !deleteState.has(work.id));
  addState.forEach((work) => customModalGallery.push(work));
  return customModalGallery;
}
// Works - deleteState + addState
