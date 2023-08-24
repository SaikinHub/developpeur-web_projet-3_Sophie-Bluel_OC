export function createElement(tag, attributes = {}) {
  const element = document.createElement(tag);
  for (const [attr, value] of Object.entries(attributes)) {
    element.setAttribute(attr, value);
  }
  return element;
}
