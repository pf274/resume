import { createContext, useContext, useEffect, useState } from "react";
import { getData } from "../gistHelper";

const ResumeContext = createContext();

export function ResumeContextProvider({children}) {
  const [resume, setResume] = useState({});
  const [authToken, setAuthToken] = useState(false);

  function finishEditing() {
    console.log("Finish editing!");
    setAuthToken(false);
    localStorage.removeItem('authToken');
  }

  useEffect(() => {
    getData().then((newData) => setResume(newData));
    if (localStorage.getItem('authToken')) {
      setAuthToken(localStorage.getItem('authToken'));
    }
  }, []);

  useEffect(() => {
    console.log("Resume updated:", resume);
  }, [resume]);
  const [page, setPage] = useState('info');
  return (
    <ResumeContext.Provider value={{page, setPage, resume, setResume, authToken, setAuthToken, finishEditing}}>
      {children}
    </ResumeContext.Provider>
  );
}

export function useResumeContext() {
  return useContext(ResumeContext);
}