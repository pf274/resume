import { createContext, useContext, useEffect, useState } from "react";
import { getData } from "../gistHelper";

const ResumeContext = createContext();

export function ResumeContextProvider({children}) {
  const [resume, setResume] = useState({});
  const [authToken, setAuthToken] = useState(false);

  useEffect(() => {
    getData().then((newData) => setResume(newData));
    if (localStorage.getItem('authToken')) {
      setAuthToken(localStorage.getItem('authToken'));
    }
  }, []);
  const [page, setPage] = useState('info');
  return (
    <ResumeContext.Provider value={{page, setPage, resume, authToken, setAuthToken}}>
      {children}
    </ResumeContext.Provider>
  );
}

export function useResumeContext() {
  return useContext(ResumeContext);
}