import { createContext, useContext, useEffect, useRef, useState } from "react";
import { getData, stringifyResume } from "../gistHelper";

const ResumeContext = createContext();

export function ResumeContextProvider({ children }) {
  const [resume, setResume] = useState({});
  const editedResume = useRef();
  const [authToken, setAuthToken] = useState(false);

  async function finishEditing() {
    console.log("Finish editing!");
    setAuthToken(false);
    localStorage.removeItem("authToken");
    editedResume.current = resume;
  }

  function clearChanges() {
    editedResume.current = resume;
    // localStorage.removeItem("authToken");
    window.location.reload();
  }

  function cancelEdit() {
    localStorage.removeItem("authToken");
    window.location.reload();
  }

  function replace(newData, path) {
    if (!path) {
      throw new Error(`Path is required to replace data: ${newData}`);
    }
    const pathParts = path.split(".");
    const resumeCopy = JSON.parse(JSON.stringify(editedResume.current));
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
    if (!path) {
      throw new Error(`Path is required to move up: ${path}`);
    }
    const pathParts = path.split(".");
    const resumeCopy = JSON.parse(JSON.stringify(editedResume.current));
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
    if (!path) {
      throw new Error(`Path is required to move down: ${path}`);
    }
    const pathParts = path.split(".");
    const resumeCopy = JSON.parse(JSON.stringify(editedResume.current));
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

  function move(path, newIndex) {
    if (!path) {
      throw new Error(`Path is required to move: ${path}`);
    }
    const pathParts = path.split(".");
    const resumeCopy = JSON.parse(JSON.stringify(editedResume.current));
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
    if (newIndex < 0 || newIndex >= target.length) {
      console.log("New index is out of bounds", path, target, newIndex);
      return;
    }
    const temp = target[lastPart];
    target.splice(lastPart, 1);
    target.splice(newIndex, 0, temp);
    editedResume.current = resumeCopy;
  }

  /**
   * Removes an item from an array
   * @param {string} path - the path of the item in an array
   */
  function remove(path) {
    if (!path) {
      throw new Error(`Path is required to remove: ${path}`);
    }
    const pathParts = path.split(".");
    const resumeCopy = JSON.parse(JSON.stringify(editedResume.current));
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
    if (!path) {
      throw new Error(`Path is required to add: ${newData}`);
    }
    const pathParts = path.split(".");
    const resumeCopy = JSON.parse(JSON.stringify(editedResume.current));
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

  function getResume() {
    return authToken && editedResume.current && Object.keys(editedResume.current).length > 0
      ? editedResume.current
      : resume;
  }
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
        move,
        moveDown,
        replace,
        editedResume,
        clearChanges,
        cancelEdit,
        getResume,
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
 * move: (path: string, newIndex: number) => void,
 * moveDown: (path: string) => void,
 * replace: (newData: object, path: string) => void,
 * editedResume: object,
 * clearChanges: () => void,
 * cancelEdit: () => void,
 * getResume: () => object
 * }}
 */
export function useResumeContext() {
  return useContext(ResumeContext);
}
