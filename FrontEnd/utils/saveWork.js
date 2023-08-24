import { fetchAllCategories } from '../services/fetchCategories.js';
import { deletionModal } from '../modules/modal.js';
import { addState } from '../features/applyChanges.js';

export async function saveWork() {
  const file = document.getElementById('modal-upload-input').files[0];
  const name = document.getElementById('modal-name').value;
  const category = document.getElementById('modal-category').value;

  const type = file?.type ?? undefined;
  const size = file?.size < 4000000 ? true : false;
  const acceptedTypes = ['image/jpeg', 'image/png', 'image/jpg'];

  const isValid =
    acceptedTypes.includes(type) && size && name !== '' && category !== '';

  const allCategories = await fetchAllCategories();
  let categoryId = null;

  for (let item of allCategories) {
    if (category === item.name) {
      categoryId = item.id;
    }
  }

  if (isValid) {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.addEventListener('load', function () {
      const unstagedWork = {
        imageUrl: this.result,
        image: file,
        isUnstaged: true,
        title: name,
        category: categoryId,
      };
      addState.add(unstagedWork);
      deletionModal();
    });
  }
}
