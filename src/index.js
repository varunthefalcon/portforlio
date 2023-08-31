import React from "react";
import ReactDOM from "react-dom/client";
import Portfolio from "./Portfolio/App";
import AutoEDA from "./autoEDA/App";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Portfolio />} />
          <Route path="/autoeda/*" index element={<AutoEDA />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
