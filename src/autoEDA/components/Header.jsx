import { Grid, Icon } from "semantic-ui-react";

const Header = () => {
  return (
    <>
      {/* <Grid.Row> */}
      <div
        style={{
          // background: "black",
          display: "flex",
          justifyContent: "flex-end",
          color: "white",
          // maxHeight: "30px",
          maxWidth: "1300px",
          paddingTop: "10px",
        }}
      >
        <a
          href="https://www.linkedin.com/in/varun-sureshkumar/"
          target="_blank"
        >
          <Icon
            color="blue"
            name="linkedin"
            style={{ fontSize: "22px", cursor: "pointer" }}
          />
        </a>
        <Icon
          onClick={() =>
            window.open("https://github.com/varunthefalcon/", "_blank")
          }
          color="white"
          name="github"
          style={{ fontSize: "22px", cursor: "pointer" }}
        />
      </div>
      {/* </Grid.Row> */}
    </>
  );
};

export default Header;
