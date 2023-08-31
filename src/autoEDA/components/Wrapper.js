import { Grid } from "semantic-ui-react";

const Wrapper = (props) => {
  return (
    <>
      <Grid centered style={{ padding: "10px", backgroundColor: "black" }}>
        <Grid.Column style={{ width: "1300px", margin: "auto" }}>
          {props.children}
        </Grid.Column>
      </Grid>
    </>
  );
};

export default Wrapper;
