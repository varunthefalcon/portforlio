import TaskBar from "../components/TaskBar";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { URL_GET_CSV } from "../utils/constants";
import Axios from "axios";
import ExcelSheet from "../components/ExcelSheet";
import ChatBox from "../components/Chatbox";
import WindowComponent from "../components/WindowComponent";

const AppPage = () => {
  const params = useParams();

  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);

  const getcsvData = async () => {
    const config = {
      method: "POST",
      url: URL_GET_CSV,
      headers: {
        "Content-Type": "application/json",
      },
      params: { fileID: params.id },
    };

    try {
      const resp = await Axios(config);
      console.log(typeof resp.data);

      let data = resp.data;

      if (typeof data === "string") {
        data = JSON.parse(data.replace(/\bNaN\b/g, '"NaN"'));
      }

      const { rows = [], columns = [] } = data;
      setRows(rows);
      setColumns(columns);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getcsvData();
  }, [params.id]);

  return (
    <div>
      {/* sub windows */}
      <WindowComponent fileID={params.id} />
      <div
        style={{ position: "relative", height: "100vh", overflow: "scroll" }}
      >
        <ExcelSheet rows={rows} columns={columns} />
        {/* taskbar */}
      </div>
      <div style={{ position: "absolute", bottom: 0 }}>
        <TaskBar />
      </div>
      <div style={{ position: "absolute", bottom: 30, right: 30 }}>
        <ChatBox fileID={params.id} />
      </div>
    </div>
  );
};

export default AppPage;
