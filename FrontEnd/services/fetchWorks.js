export function fetchWorks() {
  const works = fetch('http://localhost:5678/api/works').then((data) =>
    data.json()
  );
  return works;
}
