import { Route } from "react-router-dom";
import { useMemo, useState } from "react";
import Login from "../Pages/Login";
import { getCookiesData } from "../Utils/cookies";
const PrivateRoutes = ({ path, component }) => {
  const {token} = getCookiesData(),
    [logIn, setLogIn] = useState(false)
  useMemo(() => {
    if (token) {
      setLogIn(true);
    }
  }, [token]);

  return (
    <>
      {logIn ? (
        <Route path={path} component={component} />
      ) : (
        <Login />
      )}
    </>
  );
};

export default PrivateRoutes;
