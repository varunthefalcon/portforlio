import { useMemo, useRef, useState } from "react";
import axios from "axios";
import { ATS_GPT_URL } from "../autoEDA/utils/constants";
import { Button, Grid, GridColumn, Icon } from "semantic-ui-react";

import "./index.css";

const ATS = () => {
  const [CVSoftSkills, setCVSoftSkills] = useState([]);
  const [CVHardSkills, setCVHardSkills] = useState([]);
  const [JDSoftSkills, setJDSoftSkills] = useState([]);
  const [JDHardSkills, setJDHardSkills] = useState([]);
  const [isJDloading, setIsJDloading] = useState(false);
  const [isCVloading, setIsCVloading] = useState(false);

  const jdRef = useRef();
  const cvRef = useRef();

  const processResp = (resp) => {
    try {
      return JSON.parse(decodeURI(resp));
    } catch (error) {
      return { hard_skills: [], soft_skills: [] };
    }
  };

  const onJDSubmit = async () => {
    const config = {
      url: ATS_GPT_URL,
      method: "POST",
      data: jdRef.current.value,
    };

    let resp = {};
    try {
      setIsJDloading(true);
      resp = await axios(config);
    } catch (error) {
      console.error(error);
    } finally {
      setIsJDloading(false);
    }

    const { hard_skills = [], soft_skills = [] } = processResp(
      resp?.data?.responses
    );
    setJDSoftSkills(soft_skills);
    setJDHardSkills(hard_skills);
  };

  const onCVSubmit = async () => {
    const config = {
      url: ATS_GPT_URL,
      method: "POST",
      data: cvRef.current.value,
    };

    let resp = {};
    try {
      setIsCVloading(true);
      resp = await axios(config);
    } catch (error) {
      console.error(error);
    } finally {
      setIsCVloading(false);
    }

    const { hard_skills = [], soft_skills = [] } = processResp(
      resp?.data?.responses
    );
    setCVSoftSkills(soft_skills);
    setCVHardSkills(hard_skills);
  };

  const onOverallSubmit = () => {
    onJDSubmit();
    onCVSubmit();
  };

  return (
    <>
      <div style={{ padding: "20px 50px", background: "#fbfdff" }}>
        <div style={{ textAlign: "center", marginBottom: "15px" }}>
          <h1 className="ats_product_name">KEYWORD CHECKER</h1>
        </div>
        <br />
        <Grid columns={2}>
          <Grid.Column>
            <div className="ats_wrapper">
              <div className="ats_title_wrapper">
                <h3>Job Description</h3>

                <Button
                  color="primary"
                  loading={isJDloading}
                  onClick={onJDSubmit}
                >
                  <Icon name="sync" className="m-0" />
                </Button>
              </div>
              <TagRenderer
                skills={JDSoftSkills}
                label="Soft Skills"
                target_skills={CVSoftSkills}
              />
              <TagRenderer
                skills={JDHardSkills}
                label="Hard Skills"
                target_skills={CVHardSkills}
              />
              <div>
                <h3 className="mb-5">Just paste text</h3>
                <textarea ref={jdRef} className="ats_textarea" />
              </div>
            </div>
          </Grid.Column>
          <Grid.Column>
            <div className="ats_wrapper">
              <div className="ats_title_wrapper">
                <h3>Resume / CV</h3>

                <Button
                  color="primary"
                  loading={isCVloading}
                  onClick={onCVSubmit}
                >
                  <Icon name="sync" className="m-0" />
                </Button>
              </div>
              <TagRenderer
                skills={CVSoftSkills}
                label="Soft Skills"
                noTargetCheck={true}
              />
              <TagRenderer
                skills={CVHardSkills}
                label="Hard Skills"
                noTargetCheck={true}
              />
              <div>
                <h3 className="mb-5">Just paste text</h3>
                <textarea ref={cvRef} className="ats_textarea" />
              </div>
            </div>
          </Grid.Column>
        </Grid>
        <br />
        <Button color="primary" fluid onClick={onOverallSubmit}>
          Analyse
        </Button>
      </div>
    </>
  );
};

export default ATS;

const TagRenderer = (props) => {
  const { skills = [], label = "", target_skills = [], noTargetCheck } = props;

  const t_skills = target_skills.map((e) => e.toLowerCase());

  return (
    <>
      {!!skills.length && (
        <>
          <h3>{label}</h3>
          <p className="ats_tags_wrapper">
            {skills.map((e) => (
              <span
                key={e}
                className="ats_tags"
                style={{
                  background: noTargetCheck
                    ? "#a7c7e7"
                    : t_skills.includes(e.toLowerCase())
                    ? "#77DD77"
                    : "#FAA0A0",
                }}
              >
                {e}
              </span>
            ))}
          </p>
        </>
      )}
    </>
  );
};
