export async function getData() {
  const response = await fetch(
    "https://api.github.com/gists/30202f9981c6068164bef7fec96a5c9d"
  );
  const string = await response.text();
  const data = JSON.parse(string);
  return JSON.parse(data.files["resume.json"].content);
}

getData();
