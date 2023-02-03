import { Route } from "react-router-dom";
import { useMemo, useState } from "react";
import Login from "../Pages/Login";
import Cookies from "js-cookie";
const PrivateRoutes = ({ path, component }) => {
  const token = Cookies.get('jwt'),
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
