import { Dropdown, Icon } from "semantic-ui-react";
import {
  ADD_NEW_WINDOW,
  WINDOW_TYPE_HISTOGRAM,
  WindowsDispatchContext,
} from "../State/WindowsContext";

const ExcelSheet = (props) => {
  const { rows = [], columns = [] } = props;

  const newHistogramWindow = (col, colIndex) => {
    WindowsDispatchContext({
      type: ADD_NEW_WINDOW,
      payload: {
        windowType: WINDOW_TYPE_HISTOGRAM,
      },
    });
  };

  return (
    <>
      <div
        style={{
          // height: "35px",
          display: "flex",
          alignItems: "center",
          gap: "15px",
          flexDirection: "row",
          padding: "0 5px",
          background: "#8088ff",
          color: "white",
        }}
      >
        <span
          style={{
            lineHeight: "40px",
            fontSize: "18px",
          }}
        >
          <b>Auto EDA</b>
        </span>
        <span className="navbar_options" style={{ marginLeft: 20 }}>
          <Dropdown icon={null} text={"File"}>
            <Dropdown.Menu
              style={{ backgroundColor: "#FAFAFA", width: "150px" }}
            >
              <Dropdown.Item>Describe</Dropdown.Item>
              <Dropdown.Divider className="margin-0" />
              <Dropdown.Item
                // onClick={() => newHistogramWindow(e, i)}
                text="Histogram"
              />
            </Dropdown.Menu>
          </Dropdown>
        </span>
        <span className="navbar_options">Visualisations</span>
        <span className="navbar_options">Help</span>
      </div>
      <table>
        <thead
          style={{
            position: "sticky",
            top: 0,
            backgroundColor: "white",
            border: "1px solid black",
          }}
        >
          <tr className="sheet_head_row">
            <th className="sheet_head_cell" style={{ width: "10px" }}>
              &nbsp;
            </th>
            {columns.map((e, i) => (
              <th key={"head" + i} className="sheet_head_cell">
                {/* <Icon name="sort down" color="grey" /> */}

                <Dropdown text={e}>
                  <Dropdown.Menu
                    style={{ backgroundColor: "#FAFAFA", width: "200px" }}
                  >
                    <Dropdown.Item>Describe</Dropdown.Item>
                    <Dropdown.Divider className="margin-0" />
                    <Dropdown.Item
                      onClick={() => newHistogramWindow(e, i)}
                      text="Histogram"
                    />
                  </Dropdown.Menu>
                </Dropdown>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={"row" + i} className="sheet_row">
              <td key={"index_" + i} className="sheet_cell_index">
                {1 + i}
              </td>
              {row.map((cell, j) => (
                <td key={"row" + i + "cell" + j} className="sheet_cell">
                  {String(cell)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <br />
    </>
  );
};

export default ExcelSheet;
