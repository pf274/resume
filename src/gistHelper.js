// import { Octokit } from "octokit";

const gistId = '30202f9981c6068164bef7fec96a5c9d';


export async function getData() {
  const response = await fetch(
    `https://api.github.com/gists/${gistId}`
  );
  const string = await response.text();
  const data = JSON.parse(string);
  return JSON.parse(data.files["resume.json"].content);
}

// export async function saveData(newData) {
//   const saveData = typeof newData === "string" ? newData : JSON.stringify(newData);
//   const octokit = new Octokit({
//     auth: token,
//   })
  
//   await octokit.request('PATCH /gists/{gist_id}', {
//     gist_id: gistId,
//     files: {
//       'resume.json': {
//         content: saveData
//       }
//     },
//     headers: {
//       'X-GitHub-Api-Version': '2022-11-28'
//     }
//   })
// }

getData();
