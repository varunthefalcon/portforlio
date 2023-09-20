import React, { useCallback, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom/client";
import Portfolio, { floatInfo } from "./Portfolio/App";
import AutoEDA from "./autoEDA/App";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import CookieConsent from "react-cookie-consent";
import { HotKeys } from "react-hotkeys";
import { Button, Modal } from "semantic-ui-react";

const App = () => {
  return (
    <>
      <ToastContainer />

      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <A11yContainer>
                <Portfolio />
              </A11yContainer>
            }
          />
          <Route path="/autoeda/*" index element={<AutoEDA />} />
        </Routes>
      </BrowserRouter>
      <CookieConsent
        contentStyle={{ marginBottom: 0 }}
        cookieName="analyticsCookie"
        style={{ display: "block", width: "200px" }}
        expires={1}
      >
        This website uses cookies to for analytical purposes.
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

const A11yContainer = (props) => {
  const [modalFlag, setModalFlag] = useState(false);

  const openModal = useCallback(() => {
    console.log("modal opened");
    setModalFlag(true);
  }, []);

  useEffect(() => {
    if (modalFlag) {
      setTimeout(() => {
        window.document.getElementById("ally_modal")?.focus();
      }, 500);
    }
  }, [modalFlag]);

  return (
    <>
      <HotKeys
        handlers={{ OPEN_MODAL: openModal }}
        keyMap={{ OPEN_MODAL: "alt+a" }}
      >
        <Modal open={modalFlag}>
          <Modal.Content>
            <p id="ally_modal" tabIndex={0} style={{ fontSize: "large" }}>
              Hi, I am Varun Suresh Kumar. This is my casual Portfolio with
              links to my social links, CV and personal projects. Please access
              the links here
              {floatInfo.map((e, i) => {
                return (
                  <div>
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href={e.link}
                      download={e.download}
                    >
                      {i + 1} &nbsp; {e.label}
                    </a>
                  </div>
                );
              })}
              <small>
                I have focused my efforts to make this site accessible to Screen
                readers and users with limited mobility. Kindly email me on
                <a type="email" href="mailto: varunsk.dev@gmail.com">
                  varunsk.dev@gmail.com
                </a>
              </small>
            </p>
          </Modal.Content>
          <Modal.Actions>
            <Button
              role="button"
              tabIndex={0}
              onClick={() => setModalFlag(false)}
            >
              Close
            </Button>
          </Modal.Actions>
        </Modal>
        <span
          style={{
            background: "#d4d4d4",
            position: "absolute",
            zIndex: 110,
            padding: "0 5px",
            cursor: "pointer",
          }}
          role="button"
          tabIndex={0}
          onKeyDown={(event) => {
            event.preventDefault();
            if (event.key === "Enter" || event.key === " ") {
              setModalFlag(true);
            }
          }}
        >
          For Screenreaders and users with accessibility requirements. Press Alt
          + A
        </span>
        {props.children}
      </HotKeys>
    </>
  );
};
