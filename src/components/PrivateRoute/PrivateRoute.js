import React from "react";
import { Route, Redirect } from "react-router-dom";
import useAuthContext from "../../contexts/useAuthContext";

export function PrivateRoute({
  component: Component,
  children,
  roles,
  ...rest
}) {
  const { auth } = useAuthContext();
  function render(props) {
    if (!auth || !auth.isAuthUser) {
      return (
        <Redirect
          to={{
            pathname: "/signin",
            search: "?redirect=" + encodeURIComponent(props.location.pathname),
            state: { from: props.location },
          }}
        />
      );
    }

    // if (roles && roles.indexOf(auth.role) === -1) {
    //   return (
    //     <Redirect
    //       to={{
    //         pathname: "/home",
    //         search: props.location.search,
    //         state: props.location.state,
    //       }}
    //     />
    //   );
    // }

    if (typeof children === "function") {
      return children(props);
    }

    return <Component {...props} />;
  }

  return <Route {...rest} render={render} />;
}
