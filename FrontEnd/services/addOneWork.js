export function addOneWork(obj, token) {
  const keysToDelete = ['imageUrl', 'isUnstaged'];

  for (const key of keysToDelete) {
    if (key in obj) {
      delete obj[key];
    }
  }
  const formData = new FormData();
  for (const [key, value] of Object.entries(obj)) {
    formData.append(key, value);
  }

  return fetch('http://localhost:5678/api/works', {
    method: 'POST',
    headers: {
      authorization: 'Bearer ' + token,
    },
    body: formData,
  });
}
