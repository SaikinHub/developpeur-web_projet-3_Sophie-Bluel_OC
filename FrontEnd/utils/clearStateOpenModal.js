import { toggleModal } from '../modules/modal.js';
import { addState, deleteState } from '../features/applyChanges.js';

export function clearStateOpenModal() {
  deleteState.clear();
  addState.clear();
  toggleModal();
}
