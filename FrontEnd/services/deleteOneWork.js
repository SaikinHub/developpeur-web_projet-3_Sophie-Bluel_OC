export function deleteOneWork(id, token) {
  return fetch(`http://localhost:5678/api/works/${id}`, {
    method: 'DELETE',
    headers: {
      authorization: 'Bearer ' + token,
    },
  });
}
