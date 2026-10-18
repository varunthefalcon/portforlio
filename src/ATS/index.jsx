import { useState } from "react";
import { Button, Grid, Icon, Popup } from "semantic-ui-react";

import "./index.css";
import ColumnComponent from "./Components/ColumnComponent";

const hardSkillsInfo =
  "The skills matching in your resume/CV and Job Description are highlighted in Green. Try to match most skills for better score.";

const ATS = () => {
  const [targetSoftSkills, setTargetSoftSkills] = useState([]);
  const [targetHardSkills, setTargetHardSkills] = useState([]);
  const [allAnalyseFlag, setAllAnalyseFlag] = useState("");

  return (
    <>
      <div style={{ padding: "20px 50px", background: "#fbfdff" }}>
        <div style={{ textAlign: "center", marginBottom: "15px" }}>
          <h1 className="ats_product_name">ATS ASSIST</h1>
        </div>
        <br />
        <Grid columns={2}>
          <Grid.Column>
            <ColumnComponent
              title={"Job Description"}
              targetSoftSkills={targetSoftSkills}
              targetHardSkills={targetHardSkills}
              allAnalyseFlag={allAnalyseFlag}
              setAllAnalyseFlag={setAllAnalyseFlag}
              infoComp={
                <Popup trigger={<Icon name="info circle" color="blue" />}>
                  {hardSkillsInfo}
                </Popup>
              }
            />
          </Grid.Column>
          <Grid.Column>
            <ColumnComponent
              title={"CV / Resume"}
              setTargetSoftSkills={setTargetSoftSkills}
              setTargetHardSkills={setTargetHardSkills}
              allAnalyseFlag={allAnalyseFlag}
              setAllAnalyseFlag={setAllAnalyseFlag}
              targetSetter={true}
            />
          </Grid.Column>
        </Grid>
        <br />
        <Button
          color="primary"
          fluid
          onClick={() => setAllAnalyseFlag("analyse_all")}
        >
          Analyse
        </Button>
      </div>
    </>
  );
};

export default ATS;
