import { useContext } from "react";
import { Icon } from "semantic-ui-react";
import {
  CLOSE_WINDOW,
  TOGGLE_MINIMIZE_WINDOW,
  WindowsContext,
  WindowsDispatchContext,
} from "../State/WindowsContext";

const TaskBar = () => {
  const miniWindows = useContext(WindowsContext);
  const windowDispatcher = useContext(WindowsDispatchContext);

  const minimizeWindow = (windowID) => {
    windowDispatcher({ type: TOGGLE_MINIMIZE_WINDOW, payload: { windowID } });
  };

  const closeWindow = (windowID) => {
    if (window.confirm("Please confirm to close the window")) {
      windowDispatcher({ type: CLOSE_WINDOW, payload: { windowID } });
    }
  };

  return (
    <>
      <div style={{ display: "flex" }}>
        {miniWindows
          .filter((e) => e.isMinimised == true)
          .map((miniWindow) => (
            <div
              key={miniWindow.windowID}
              style={{
                padding: "3px 6px",
                backgroundColor: "rgb(126,136,255)",
                border: "1px solid rgb(126,136,255)",
                borderLeft: "none",
                width: "120px",
                cursor: "pointer",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span
                onClick={() => minimizeWindow(miniWindow.windowID)}
                style={{
                  marginRight: "3px",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  // fontSize: "0.8em",
                  width: "100%",
                  color: "white",
                }}
              >
                {miniWindow.windowTitle}
              </span>
              <span
                onClick={() => closeWindow(miniWindow.windowID)}
                className="closeIcon"
              >
                <Icon
                  name="close"
                  className="taskbar_close"
                  style={{ margin: 0, color: "white !important" }}
                />
              </span>
            </div>
          ))}
      </div>
    </>
  );
};

export default TaskBar;
