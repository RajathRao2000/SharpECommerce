import { createContext } from "react";

export const Variables=createContext({
    apiToken: "",
    setToken: ()=>{},
    clearToken: ()=>{}
})