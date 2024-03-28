import React, { useEffect, useState } from "react";
import { Variables } from "./Variables";

function ContextProvider(props) {
  
  const [variables, setVariables] = useState({
    apiToken: localStorage.getItem("token"),
    setToken: setToken,
    clearToken: clearToken,
  });

  useEffect(() => {
    // console.log("settoken", variables);
  }, [variables]);

  function clearToken() {
    setVariables((prev) => {
      const newContext = { ...prev };
      newContext.apiToken = "";
      localStorage.removeItem("token")
      return newContext;
    });
  }

  function setToken(token) {
    // console.log("settoken",token)
    setVariables((prev) => {
      const newContext = { ...prev };
      newContext.apiToken = token;
      localStorage.setItem("token",token)
      // console.log(token, newContext);
      return newContext;
    });
  }

  return (
    <Variables.Provider value={variables}>{props.children}</Variables.Provider>
  );
}

export default ContextProvider;
