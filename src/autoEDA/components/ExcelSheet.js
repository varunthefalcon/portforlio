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
            {columns.map((e, i) => (
              <th key={"head" + i} className="sheet_head_cell">
                {/* <Icon name="sort down" color="grey" /> */}

                <Dropdown text={e}>
                  {/* <Dropdown.Menu style={{ backgroundColor: "#E8E8E8" }}>
                    <Dropdown.Item>Describe</Dropdown.Item>
                    <Dropdown.Divider className="margin-0" />
                    <Dropdown.Item
                      onClick={() => newHistogramWindow(e, i)}
                      text="Histogram"
                    />
                  </Dropdown.Menu> */}
                </Dropdown>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={"row" + i} className="sheet_row">
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
