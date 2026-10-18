import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./Container/LandingPage";
import AppPage from "./Container/AppPage";
import { WindowsProvider } from "./State/WindowsContext";

import "semantic-ui-css/semantic.min.css";
import "./App.css";

function App() {
  useEffect(() => {
    window.document.title = "AutoEDA";
  }, []);

  return (
    <React.StrictMode>
      <WindowsProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/app/:id" element={<AppPage />} />
        </Routes>
      </WindowsProvider>
    </React.StrictMode>
  );
}

export default App;
