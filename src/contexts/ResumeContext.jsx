import { createContext, useContext, useEffect, useRef, useState } from "react";
import { getData } from "../gistHelper";

const ResumeContext = createContext();

export function ResumeContextProvider({ children }) {
  const [resume, setResume] = useState({});
  const editedResume = useRef({});
  const [authToken, setAuthToken] = useState(false);

  function finishEditing() {
    console.log("Finish editing!");
    setAuthToken(false);
    localStorage.removeItem("authToken");
    editedResume.current = resume;
  }

  function replace(newData, path) {
    const pathParts = path.split(".");
    const resumeCopy = Object.assign({}, resume);
    let target = resumeCopy;
    for (let i = 0; i < pathParts.length - 1; i++) {
      let part = pathParts[i];
      if (!isNaN(part)) {
        part = Number(part);
      }
      target = target[part];
    }
    const lastPart = Number.isNaN(Number(pathParts[pathParts.length - 1]))
      ? pathParts[pathParts.length - 1]
      : Number(pathParts[pathParts.length - 1]);
    target[lastPart] = newData;
    editedResume.current = resumeCopy;
  }

  function moveUp(path) {
    const pathParts = path.split(".");
    const resumeCopy = Object.assign({}, resume);
    let target = resumeCopy;
    for (let i = 0; i < pathParts.length - 1; i++) {
      let part = pathParts[i];
      if (!isNaN(part)) {
        part = Number(part);
      }
      target = target[part];
    }
    const lastPart = Number.isNaN(Number(pathParts[pathParts.length - 1]))
      ? pathParts[pathParts.length - 1]
      : Number(pathParts[pathParts.length - 1]);
    if (Array.isArray(target) == false) {
      console.log("Path is not an item in an array", path, target);
      return;
    }
    if (lastPart === 0) {
      console.log("Item is already at the beginning of the array", path, target);
      return;
    }
    const temp = target[lastPart];
    target[lastPart] = target[lastPart - 1];
    target[lastPart - 1] = temp;
    editedResume.current = resumeCopy;
  }

  /**
   *
   * @param {string} path - the path of the item in an array
   */
  function moveDown(path) {
    const pathParts = path.split(".");
    const resumeCopy = Object.assign({}, resume);
    let target = resumeCopy;
    for (let i = 0; i < pathParts.length - 1; i++) {
      let part = pathParts[i];
      if (!isNaN(part)) {
        part = Number(part);
      }
      target = target[part];
    }
    const lastPart = Number.isNaN(Number(pathParts[pathParts.length - 1]))
      ? pathParts[pathParts.length - 1]
      : Number(pathParts[pathParts.length - 1]);
    if (Array.isArray(target) == false) {
      console.log("Path is not an item in an array", path, target);
      return;
    }
    if (lastPart === target.length - 1) {
      console.log("Item is already at the end of the array", path, target);
      return;
    }
    const temp = target[lastPart];
    target[lastPart] = target[lastPart + 1];
    target[lastPart + 1] = temp;
    editedResume.current = resumeCopy;
  }

  /**
   * Removes an item from an array
   * @param {string} path - the path of the item in an array
   */
  function remove(path) {
    const pathParts = path.split(".");
    const resumeCopy = Object.assign({}, resume);
    let target = resumeCopy;
    for (let i = 0; i < pathParts.length - 1; i++) {
      let part = pathParts[i];
      if (!isNaN(part)) {
        part = Number(part);
      }
      target = target[part];
    }
    const lastPart = Number.isNaN(Number(pathParts[pathParts.length - 1]))
      ? pathParts[pathParts.length - 1]
      : Number(pathParts[pathParts.length - 1]);
    if (Array.isArray(target)) {
      target.splice(lastPart, 1);
      editedResume.current = resumeCopy;
    } else {
      console.log("Path is not an item in an array", path, target);
    }
  }

  /**
   * Adds an item to the end of an array
   * @param {object} newData
   * @param {string} path - the path of the array
   */
  function add(newData, path) {
    const pathParts = path.split(".");
    const resumeCopy = Object.assign({}, resume);
    let target = resumeCopy;
    for (let i = 0; i < pathParts.length; i++) {
      let part = pathParts[i];
      if (!isNaN(part)) {
        part = Number(part);
      }
      target = target[part];
    }
    if (Array.isArray(target)) {
      target.push(newData);
      editedResume.current = resumeCopy;
    } else {
      console.log("Path is not an array", path, target);
    }
  }

  useEffect(() => {
    getData().then((newData) => setResume(newData));
    if (localStorage.getItem("authToken")) {
      setAuthToken(localStorage.getItem("authToken"));
    }
  }, []);

  useEffect(() => {
    console.log("Resume updated:", resume);
    editedResume.current = resume;
  }, [resume]);
  const [page, setPage] = useState("info");
  return (
    <ResumeContext.Provider
      value={{
        page,
        setPage,
        resume,
        setResume,
        authToken,
        setAuthToken,
        finishEditing,
        add,
        remove,
        moveUp,
        moveDown,
        replace,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
}

/**
 * @returns {{
 * page: string,
 * setPage: (page: string) => void,
 * resume: object,
 * setResume: (resume: object) => void,
 * authToken: string | null,
 * setAuthToken: (token: string | null) => void,
 * finishEditing: () => void,
 * add: (newData: object, path: string) => void,
 * remove: (path: string) => void,
 * moveUp: (path: string) => void,
 * moveDown: (path: string) => void,
 * replace: (newData: object, path: string) => void
 * }}
 */
export function useResumeContext() {
  return useContext(ResumeContext);
}
