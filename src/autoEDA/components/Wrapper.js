import { Grid } from "semantic-ui-react";

const Wrapper = (props) => {
  return (
    <>
      <Grid centered style={{ backgroundColor: "black" }}>
        <Grid.Column style={{ width: "1300px", margin: "auto" }}>
          {props.children}
        </Grid.Column>
      </Grid>
    </>
  );
};

export default Wrapper;
