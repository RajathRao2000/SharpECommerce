import { Switch, Route } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import UserProfile from "./components/Profile/UserProfile";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import { useContext, useEffect } from "react";
import { Variables } from "./components/context/Variables";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import ContextProvider from "./components/context/ContextProvider";

function App() {
  const {apiToken}=useContext(Variables)
  useEffect(() => {
  }, [apiToken]);
  return (
      <Layout>
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          {!apiToken && (
            <Route path="/auth">
              <AuthPage />
            </Route>
          )}
          {apiToken && (
            <Route path="/profile">
              <UserProfile />
            </Route>
          )}
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </Layout>
    // </ContextProvider>
  );
}

export default App;
