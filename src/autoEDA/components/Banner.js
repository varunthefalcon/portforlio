import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Button, Grid, Icon, Loader, Popup } from "semantic-ui-react";
import { URL_UPLOAD_CSV } from "../utils/constants";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const navigate = useNavigate();

  const [csvFile, setCSVFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadingDone, setUploadingDone] = useState(false);

  const handleFileChange = (e) => {
    console.log(e, e.target, e.target.files);
    setCSVFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    // if (!csvFile) {
    // toast.warn("Please upload a file");
    // }

    let formdata = new FormData();

    formdata.append("csv_file", csvFile);

    try {
      const config = {
        method: "POST",
        url: URL_UPLOAD_CSV,
        data: formdata,
      };
      setUploading(true);
      const resp = await axios(config);
      console.log(resp);
      setUploadingDone(true);
      setTimeout(() => {
        navigate("/autoeda/app/" + resp?.data?.fileID);
      }, 500);
    } catch (error) {
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      {/* // <Grid.Row centered textAlign="center"> */}
      <div
        style={{
          // background: "black",
          color: "white",
          // height: "calc(100vh - 30px)",
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          paddingTop: "50px",
        }}
      >
        <h1 className="product_name" style={{ padding: 0, margin: 0 }}>
          AutoEDA
        </h1>
        <h2
          style={{ fontSize: "3rem", padding: "1rem 0" }}
          className="textCentered"
        >
          Explore your data with powerful LLM and predictive AI
        </h2>

        <div style={{ display: "inline-block" }}>
          <div style={{ display: "inline-block", position: "relative" }}>
            <Button style={{ maxWidth: "250px", textOverflow: "ellipsis" }}>
              <input
                type="file"
                name="csvFile"
                className="textInput"
                accept="text/csv"
                onChange={handleFileChange}
              ></input>
              <span style={{ textOverflow: "ellipsis" }}>
                {csvFile ? csvFile.name : "Upload CSV here"}
              </span>
            </Button>
          </div>
          {csvFile ? (
            <Button color="green" onClick={handleUpload} loading={uploading}>
              <Icon
                name={uploadingDone ? "check" : "arrow right"}
                style={{ margin: "auto" }}
              />
            </Button>
          ) : (
            <a href={require("../Assets/Titanic.csv")} download>
              <Popup
                position="bottom left"
                trigger={
                  <span style={{ padding: "5px" }}>
                    <Icon name="download" />
                  </span>
                }
              >
                Download Titanic dataset here to try the app.
              </Popup>
            </a>
          )}
        </div>

        <br />
        <br />
      </div>
      {/* </Grid.Row> */}
    </>
  );
};

export default Banner;
