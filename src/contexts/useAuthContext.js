import React, { useContext } from "react";
import { useAuth } from "../hooks/useAuth";

const AuthContext = React.createContext();

export function AuthProvider(props) {
  const { children } = props;
  const { user, logIn, logOut } = useAuth();
  const value = {
    currentUser: user,
    login: (param) => {
      return logIn(param);
    },
    logout: (param) => {
      return logOut(param);
    },
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuthContext() {
  return useContext(AuthContext);
}

export default useAuthContext;
