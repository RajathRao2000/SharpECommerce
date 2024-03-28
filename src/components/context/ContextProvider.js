import React, { useEffect, useState } from "react";
import { Variables } from "./Variables";

function ContextProvider(props) {
  if(localStorage.getItem("token")){
    const oldDate=new Date(JSON.parse(localStorage.getItem("token")).date)
    const currentDate=new Date()
    // console.log(oldDate,currentDate,(currentDate.getTime()-oldDate.getTime())/60000,Math.floor((currentDate.getTime()-oldDate.getTime())/60000)>5)
    if(Math.floor((currentDate.getTime()-oldDate.getTime())/60000)>5){
      alert("The token has expired!! Please login again...")
      localStorage.removeItem("token")
  
    }
  }

  
  const [variables, setVariables] = useState({
    apiToken: localStorage.getItem("token")?JSON.parse(localStorage.getItem("token")).token:"",
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
      const obj={
        token: token,
        date: new Date()
      }
      localStorage.setItem("token",JSON.stringify(obj))
      // console.log(token, newContext);
      return newContext;
    });
  }

  return (
    <Variables.Provider value={variables}>{props.children}</Variables.Provider>
  );
}

export default ContextProvider;
