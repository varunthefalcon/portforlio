import { createContext, useReducer } from "react";

export const WindowsContext = createContext(null);
export const WindowsDispatchContext = createContext(null);

export const CLOSE_WINDOW = "CLOSE_WINDOW";
export const ADD_NEW_WINDOW = "ADD_NEW_WINDOW";
export const UPDATE_WINDOW_DATA = "UPDATE_WINDOW_DATA";
export const TOGGLE_MINIMIZE_WINDOW = "TOGGLE_MINIMIZE_WINDOW";
export const TOGGLE_FULLSCREEN_WINDOW = "TOGGLE_FULLSCREEN_WINDOW";
export const UPDATE_WINDOW_POSITION = "UPDATE_WINDOW_POSITION";

export const WINDOW_TYPE_HISTOGRAM = "WINDOW_TYPE_HISTOGRAM";
export const WINDOW_TYPE_WELCOME = "WINDOW_TYPE_WELCOME";

const initialWindows = [
  {
    windowID: "welcome_message",
    windowTitle: "Greetings!",
    windowType: WINDOW_TYPE_WELCOME,
    columnIndex: "",
    isMinimised: false,
    isFullWindowed: false,
    data: {
      min: 0,
      max: 0,
    },
    zIndex: 21,
  },
];

function windowsReducer(windows, action) {
  switch (action.type) {
    case ADD_NEW_WINDOW: {
      return [
        ...windows,
        {
          windowID: "window2",
          windowType: "DESCRIBE",
          windowTitle: "Describe 2",
          columnIndex: "",
          isMinimised: false,
          isFullWindowed: false,
          data: {},
          zIndex: 10,
        },
      ];
    }
    case TOGGLE_MINIMIZE_WINDOW: {
      let tempWindows = [...windows];
      const windowIndex = tempWindows.findIndex(
        (e) => action.payload.windowID === e.windowID
      );

      const window = { ...tempWindows[windowIndex] };
      window.isMinimised = !window.isMinimised;
      tempWindows[windowIndex] = window;
      return [...tempWindows];
    }

    case TOGGLE_FULLSCREEN_WINDOW: {
      let tempWindows = [...windows];
      const windowIndex = tempWindows.findIndex(
        (e) => action.payload.windowID === e.windowID
      );

      const window = { ...tempWindows[windowIndex] };
      window.isFullWindowed = !window.isFullWindowed;
      tempWindows[windowIndex] = window;
      return [...tempWindows];
    }

    case UPDATE_WINDOW_DATA: {
      let tempWindows = [...windows];
      const windowIndex = tempWindows.findIndex(
        (e) => action.payload.windowID === e.windowID
      );

      const window = { ...tempWindows[windowIndex] };
      window.data = { ...action.payload };
      tempWindows[windowIndex] = window;
      return [...tempWindows];
    }

    case UPDATE_WINDOW_POSITION: {
      let tempWindows = [...windows];
      const windowIndex = tempWindows.findIndex(
        (e) => action.payload.windowID === e.windowID
      );

      let zIndex = findMaxzIndex(windows) + 1;
      const window = { ...tempWindows[windowIndex] };
      window.zIndex = zIndex;
      tempWindows[windowIndex] = window;
      return [...tempWindows];
    }

    case CLOSE_WINDOW: {
      const newWindows = windows.filter(
        (e) => action.payload.windowID !== e.windowID
      );
      return newWindows;
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

export function WindowsProvider({ children }) {
  const [windows, dispatch] = useReducer(windowsReducer, initialWindows);
  console.log(windows);
  return (
    <WindowsContext.Provider value={windows}>
      <WindowsDispatchContext.Provider value={dispatch}>
        {children}
      </WindowsDispatchContext.Provider>
    </WindowsContext.Provider>
  );
}

export const findMaxzIndex = (list) => {
  let indices = list.map((e) => parseInt(e.zIndex));
  console.log(Math.max(...indices), indices);
  return Math.max(...indices);
};
