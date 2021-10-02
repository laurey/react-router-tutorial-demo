import { useState } from "react";

export function useAuth() {
  const [user, setUser] = useState(null);
  const logIn = (data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setUser({ ...data, id: new Date().valueOf(), isAuthUser: true });
        resolve();
      }, 200);
    });
  };

  const logOut = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setUser(null);
        resolve();
      }, 200);
    });
  };

  const { isAuthUser } = user || {};

  return {
    auth: {
      isAuthUser,
      user,
    },
    user,
    logIn,
    logOut,
  };
}
