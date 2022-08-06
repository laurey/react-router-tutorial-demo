import React from "react";
// import BasicLayout from "./layouts/BasicLayout";
import { BasicLayoutProvider } from "./contexts/useBasicLayoutContext";
import { AuthProvider } from "./contexts/useAuthContext";
import "./App.css";

function App(props) {
  return (
    <BasicLayoutProvider>
      <AuthProvider>
        <div>
          <h1>hahhaa</h1>
          {props.children}
        </div>
      </AuthProvider>
    </BasicLayoutProvider>
  );
}

export default App;
