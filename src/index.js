import React from "react";
import ReactDOM from "react-dom/client";
import Portfolio from "./Portfolio/App";
import AutoEDA from "./autoEDA/App";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import CookieConsent from "react-cookie-consent";

const App = () => {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Portfolio />} />
          <Route path="/autoeda/*" index element={<AutoEDA />} />
        </Routes>
      </BrowserRouter>
      <CookieConsent
        contentStyle={{ marginBottom: 0 }}
        cookieName="analyticsCookie"
        style={{ display: "block", width: "200px" }}
        expires={1}
      >
        This website uses cookies to enhance the user experience.
      </CookieConsent>
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
