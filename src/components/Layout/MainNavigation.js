import { Link } from "react-router-dom";

import classes from "./MainNavigation.module.css";
import { useContext, useState } from "react";
import { Variables } from "../context/Variables";
import { useHistory } from "react-router";

const MainNavigation = () => {
  const { clearToken, apiToken } = useContext(Variables);
  const history=useHistory()

  const handleLogOut=()=>{
    clearToken()
    history.replace("/auth")
  }

  return (
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {apiToken ? (
            <>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <button onClick={handleLogOut}>Logout</button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/auth">Login</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
