import Draggable from "react-draggable";
import { Icon } from "semantic-ui-react";
import { Resizable } from "re-resizable";
import {
  CLOSE_WINDOW,
  TOGGLE_FULLSCREEN_WINDOW,
  TOGGLE_MINIMIZE_WINDOW,
  UPDATE_WINDOW_POSITION,
  WINDOW_TYPE_HISTOGRAM,
  WINDOW_TYPE_WELCOME,
  WindowsContext,
  WindowsDispatchContext,
} from "../State/WindowsContext";
import { useContext } from "react";
import Histogram from "./Visualisations/Histogram";
import Greetings from "./Visualisations/Greetings";

const WindowComponent = (props = {}) => {
  const { fileID } = props;

  const miniWindows = useContext(WindowsContext);
  const windowDispatcher = useContext(WindowsDispatchContext);

  const minimizeWindow = (windowID) => {
    windowDispatcher({ type: TOGGLE_MINIMIZE_WINDOW, payload: { windowID } });
  };

  // const fullScreenWindow = (windowID) => {
  //   windowDispatcher({ type: TOGGLE_FULLSCREEN_WINDOW, payload: { windowID } });
  // };

  const closeWindow = (windowID) => {
    if (window.confirm("Please confirm to close the window")) {
      windowDispatcher({ type: CLOSE_WINDOW, payload: { windowID } });
    }
  };

  const bringWindowToFront = (windowID) => {
    windowDispatcher({ type: UPDATE_WINDOW_POSITION, payload: { windowID } });
  };

  return (
    <>
      {miniWindows.map((miniWindow, i) => (
        <Draggable
          key={miniWindow.windowID}
          handle=".window_handle"
          defaultPosition={{ x: 50 + i * 20, y: 50 + i * 20 }}
          // position={miniWindow.isFullWindowed ? { x: 0, y: 0 } : null}
          scale={1}
        >
          <div
            className="ui_window"
            onMouseDownCapture={() => bringWindowToFront(miniWindow.windowID)}
            // display none is preferred instead of conditional render. On expansion rerendering is minimised
            style={{
              display: miniWindow.isMinimised ? "none" : "initial",
              zIndex: miniWindow.zIndex,
              // width: "100%",
              // height: "100%",
            }}
          >
            <div className="window_handle">
              <div style={{ padding: "5px" }}>
                <span>{miniWindow.windowTitle}</span>
              </div>
              <div>
                <span onClick={() => minimizeWindow(miniWindow.windowID)}>
                  <Icon
                    className="hover_emboss"
                    name="window minimize outline"
                  />
                </span>
                {/* <span onClick={() => fullScreenWindow(miniWindow.windowID)}>
                  <Icon
                    className="hover_emboss"
                    name={
                      miniWindow.isFullWindowed
                        ? "caret square down outline"
                        : "caret square up outline"
                    }
                  />
                </span> */}
                <span onClick={() => closeWindow(miniWindow.windowID)}>
                  <Icon
                    className="closeIcon hover_emboss"
                    name="window close outline"
                  />
                </span>
              </div>
            </div>
            <Resizable
              style={{
                overflow: "scroll",
              }}
              defaultSize={{
                width: 600,
                height: 300,
              }}
            >
              <div
                className="window_content"
                style={{
                  wordBreak: "break-word",
                  textAlign: "justify",
                  padding: "10px",
                  // width: miniWindow.isFullWindowed ? "98vw" : "600px",
                  // height: miniWindow.isFullWindowed ? "95vh" : "300px",
                }}
              >
                {miniWindow.windowType === WINDOW_TYPE_HISTOGRAM && (
                  <Histogram data={miniWindow} />
                )}

                {miniWindow.windowType === WINDOW_TYPE_WELCOME && (
                  <Greetings fileID={fileID} />
                )}
              </div>
            </Resizable>
          </div>
        </Draggable>
      ))}
    </>
  );
};

export default WindowComponent;
