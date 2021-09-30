import React from "react";
import BasicLayout from "./layouts/BasicLayout";
import { BasicLayoutProvider } from "./contexts/useBasicLayoutContext";
import { AuthProvider } from "./contexts/useAuthContext";
import "./App.css";

function App() {
  return (
    <BasicLayoutProvider>
      <AuthProvider>
        <BasicLayout />
      </AuthProvider>
    </BasicLayoutProvider>
  );
}

export default App;
