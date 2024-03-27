import React, { useState } from "react";
import { Variables } from "./Variables";

function ContextProvider(props) {
  const [variables, setVariables] = useState({
    apiToken: "",
    setToken: setToken,
    clearToken: clearToken,
  });

  function clearToken() {
    setVariables((prev) => {
      const newContext = { ...prev };
      newContext.apiToken = "";
      return newContext;
    });
  }

  function setToken(token) {
    setVariables((prev) => {
      const newContext = { ...prev };
      newContext.apiToken = token;
      return newContext;
    });
  }

  return (
    <Variables.Provider value={variables}>{props.children}</Variables.Provider>
  );
}

export default ContextProvider;
