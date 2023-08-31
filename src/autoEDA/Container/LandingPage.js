import { Container } from "semantic-ui-react";
import Wrapper from "../components/Wrapper";
import Header from "../components/Header";
import Banner from "../components/Banner";

const LandingPage = () => {
  return (
    <>
      <Container fluid>
        <Wrapper>
          <Header />
          <Banner />
        </Wrapper>
      </Container>
    </>
  );
};

export default LandingPage;
