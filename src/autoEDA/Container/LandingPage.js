import { Container } from "semantic-ui-react";
import Wrapper from "../components/Wrapper";
import Header from "../components/Header";
import Banner from "../components/Banner";
import Img1 from "../Assets/media/landing page icons/upload.png";
import Img2 from "../Assets/media/landing page icons/analytics.png";
import Img3 from "../Assets/media/landing page icons/monitor.png";
import Img4 from "../Assets/media/landing page icons/business-report.png";

const LandingPage = () => {
  return (
    <>
      {/* <Container fluid> */}
      <div
        style={{
          backgroundColor: "black",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div>
          <Header />
          <Banner />
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              maxWidth: "1200px",
              margin: "auto",
              marginTop: "60px",
            }}
          >
            <CardComp
              image={Img1}
              step={"Step 1"}
              content={"Upload the dataset as CSV"}
            />
            <CardComp
              image={Img2}
              step={"Step 2"}
              content={"Analyze the data with AI suggestions."}
            />
            <CardComp
              image={Img3}
              step={"Step 3"}
              content={"Visualize AI recommended graphs."}
            />
            <CardComp
              image={Img4}
              step={"Step 4"}
              content={"Export report as persistent weblinks"}
            />
          </div>
        </div>
      </div>
      {/* </Container> */}
    </>
  );
};

export default LandingPage;

const CardComp = (props) => {
  const { image, step, content } = props;
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          color: "white",
          whiteSpace: "break-spaces",
          flexBasis: "min-content",
          textAlign: "center",
        }}
      >
        <p>{step}</p>
        <img className="landing_images" src={image} />
        <p>{content}</p>
      </div>
    </>
  );
};
