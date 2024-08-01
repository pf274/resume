import CryptoJS from "crypto-js";
import { Octokit } from "octokit";

const gistId = "30202f9981c6068164bef7fec96a5c9d";

export async function getData() {
  const response = await fetch(`https://api.github.com/gists/${gistId}`);
  const string = await response.text();
  const data = JSON.parse(string);
  return JSON.parse(data.files["resume.json"].content);
}

export function stringifyResume(resume) {
  // const replacer = (key, value) =>
  //   value instanceof Object && !(value instanceof Array)
  //     ? Object.keys(value)
  //         .sort()
  //         .reduce((sorted, key) => {
  //           sorted[key] = value[key];
  //           return sorted;
  //         }, {})
  //     : value;
  return JSON.stringify(resume, null, 2);
  // return JSON.stringify(resume, replacer, 2);
}

export async function saveData(newData, authToken) {
  const dataToSave = typeof newData === "string" ? newData : JSON.stringify(newData, null, 2);
  const octokit = new Octokit({
    auth: authToken,
  });

  const response = await octokit.request("PATCH /gists/{gist_id}", {
    gist_id: gistId,
    files: {
      "resume.json": {
        content: dataToSave,
      },
    },
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });
  if (response.status === 200) {
    console.log("Data saved successfully");
  } else {
    console.log("Data save failed");
  }
}

export function authenticate(field1, field2) {
  try {
    const bytes = CryptoJS.AES.decrypt(field2, field1);
    const decryptedString = bytes.toString(CryptoJS.enc.Utf8);
    if (
      decryptedString.charAt(0) != "|" ||
      decryptedString.charAt(decryptedString.length - 1) != "|"
    ) {
      return null;
    }
    return decryptedString.slice(1, decryptedString.length - 1);
  } catch (err) {
    return null;
  }
}
