export async function fetchWork() {
  const works = await fetch('http://localhost:5678/api/works').then((data) =>
    data.json()
  );
  return works;
}
