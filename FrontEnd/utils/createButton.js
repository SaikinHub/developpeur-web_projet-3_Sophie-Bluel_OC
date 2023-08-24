export function createButton(id, text, clickHandler) {
  const button = document.createElement('button');
  button.setAttribute('id', id);
  button.textContent = text;
  button.addEventListener('click', clickHandler);
  return button;
}
