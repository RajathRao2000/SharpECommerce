import { Link } from "react-router-dom";

import classes from "./MainNavigation.module.css";
import { useContext, useState } from "react";
import { Variables } from "../context/Variables";

const MainNavigation = () => {
  const { clearToken, apiToken } = useContext(Variables);

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
                <button onClick={clearToken}>Logout</button>
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
