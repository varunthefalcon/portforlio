import { Button, Grid, Input } from "semantic-ui-react";
import { useState } from "react";
import { URL_UPLOAD_CSV } from "../utils/constants";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const navigate = useNavigate();

  const [csvFile, setCSVFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    console.log(e, e.target, e.target.files);
    setCSVFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    let formdata = new FormData();

    formdata.append("csv_file", csvFile);

    try {
      const config = {
        method: "POST",
        url: URL_UPLOAD_CSV,
        data: formdata,
      };

      const resp = await axios(config);
      console.log(resp);

      navigate("/autoeda/app/" + resp.data.fileID);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Grid.Row centered textAlign="center">
      <div
        style={{
          background: "black",
          color: "white",
          height: "calc(100vh - 200px)",
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          paddingTop: "20vh",
        }}
      >
        <h2
          style={{ fontSize: "3rem", padding: "3rem 0" }}
          className="textCentered"
        >
          Explore your data with powerful LLMs
        </h2>

        <Button>
          <input
            type="file"
            name="csvFile"
            accept="text/csv"
            onChange={handleFileChange}
          ></input>
          upload Upload CSV files here
        </Button>
        <br />
        {csvFile && <Button onClick={handleUpload}>Proceed</Button>}
      </div>
    </Grid.Row>
  );
};

export default Banner;
