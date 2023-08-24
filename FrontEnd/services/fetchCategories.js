import { works } from '../app.js';

export function fetchAllCategories() {
  const set = fetch('http://localhost:5678/api/categories').then((res) =>
    res.json()
  );
  return set;
}

export function fetchCategories() {
  // Creates a "Set" object in which each property cannot be added more than once
  const set = new Set();
  set.add('Tous');

  // Checks for all categories availlable and add them into the set
  works.forEach((work) => {
    set.add(work.category.name);
  });
  return set;
}
