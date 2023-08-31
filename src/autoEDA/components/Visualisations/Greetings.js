import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Icon } from "semantic-ui-react";
import { URL_INITIAL_DATA } from "../../utils/constants";
import ReactMarkdown from "react-markdown";

const Greetings = () => {
  const params = useParams();

  const [data, setData] = useState({});
  const [fetching, setFetching] = useState(false);

  const fetchData = async () => {
    const config = {
      url: URL_INITIAL_DATA,
      method: "POST",
      data: {
        fileID: params.id,
      },
    };

    try {
      setFetching(true);
      const resp = await axios(config);
      setData(resp.data);
    } catch (error) {
      console.error(error);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    if (!fetching) {
      fetchData();
    }
  }, []);

  if (fetching) {
    return (
      <>
        <br /> <br /> <br />
        <p style={{ textAlign: "center" }}>
          <Icon name="loading" />
          Please wait fetching....
        </p>
      </>
    );
  }

  // if (!data.rowCount) {
  //   return (
  //     <>
  //       <br /> <br /> <br />
  //       <p style={{ textAlign: "center" }}>
  //         <Icon name="warning" />
  //         Something went wrong we can find the data. Please try again.
  //       </p>
  //     </>
  //   );
  // }

  const { description = "N/A", dimensions = [], counts = [] } = data || {};

  return (
    <div>
      <h3>AI's background on the dataset:</h3>
      <ReactMarkdown>{description}</ReactMarkdown>
      <h3>Dimensions:</h3>
      Total No of rows: {dimensions[0]}
      <br />
      Total No of columns: {dimensions[1]}
      <h3>Count:</h3>
      <table>
        <thead>
          <tr>
            <th>Column </th>
            <th>d-type</th>
            <th>NA Count</th>
            <th>No of Unique values</th>
            {/* <th>Mean</th>
            <th>Skewness</th>
            <th>Kurtosis</th> */}
          </tr>
        </thead>
        <tbody>
          {counts.map((e) => (
            <tr>
              <td>{e["column"]}</td>
              <td>{e["dType"]}</td>
              <td>{e["naCount"]}</td>
              <td>{e["uniqueCount"]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Greetings;
