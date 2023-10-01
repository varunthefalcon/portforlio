import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { ATS_GPT_URL, ATS_WORD_CLOUD } from "../../autoEDA/utils/constants";
import { Button, Icon, Popup } from "semantic-ui-react";
import TagRenderer from "./TagRenderer";
import SVGRenderer from "./SVGRenderer";

const processResp = (resp) => {
  try {
    return JSON.parse(decodeURI(resp));
  } catch (error) {
    return { hard_skills: [], soft_skills: [] };
  }
};

const ColumnComponent = (props) => {
  const {
    title = "",
    infoComp = null,
    targetSoftSkills = [],
    targetHardSkills = [],
    setTargetHardSkills = () => {},
    setTargetSoftSkills = () => {},
    allAnalyseFlag = false,
    setAllAnalyseFlag = () => {},
    targetSetter = false,
  } = props;

  const [isAPILoading, setIsAPILoading] = useState(false);
  const [softSkills, setSoftSkills] = useState(false);
  const [hardSkills, setHardSkills] = useState(false);
  const [wordCloud, setWordCloud] = useState("");

  const inpRef = useRef();

  const onRefreshClick = async () => {
    const config = {
      url: ATS_GPT_URL,
      method: "POST",
      data: inpRef.current.value,
    };

    if (!!!config.data) return;

    let resp = {};
    try {
      setIsAPILoading(true);
      resp = await axios(config);
    } catch (error) {
      console.error(error);
    } finally {
      GET_SVG();
      setIsAPILoading(false);
    }

    const { hard_skills = [], soft_skills = [] } = processResp(
      resp?.data?.responses
    );
    setSoftSkills(soft_skills);
    setHardSkills(hard_skills);
    if (targetSetter) {
      setTargetSoftSkills(soft_skills);
      setTargetHardSkills(hard_skills);
    }
  };

  const GET_SVG = async () => {
    const config = {
      url: ATS_WORD_CLOUD,
      method: "POST",
      data: inpRef.current.value,
    };

    let resp = {};
    try {
      setIsAPILoading(true);
      resp = await axios(config);
      setWordCloud(resp?.data?.svg.replaceAll("\n", ""));
    } catch (error) {
      console.error(error);
    } finally {
      setIsAPILoading(false);
    }
  };

  useEffect(() => {
    if (allAnalyseFlag == "analyse_all") {
      onRefreshClick();
      setAllAnalyseFlag("");
    }
  }, [allAnalyseFlag]);

  return (
    <>
      <div className="ats_wrapper">
        <div className="ats_title_wrapper">
          <h3>{title}</h3>

          <Popup
            content="Analyse"
            position="bottom center"
            trigger={
              <Button
                color="primary"
                loading={isAPILoading}
                onClick={onRefreshClick}
              >
                <Icon name="sync" className="m-0" />
              </Button>
            }
          />
        </div>
        <TagRenderer
          skills={softSkills}
          label="Soft Skills"
          target_skills={targetSoftSkills}
        />
        <TagRenderer
          skills={hardSkills}
          label="Hard Skills"
          infoComp={infoComp}
          target_skills={targetHardSkills}
        />
        <SVGRenderer content={wordCloud} />
        <br />
        <div>
          <h3 className="mb-5">Just paste text</h3>
          <textarea ref={inpRef} className="ats_textarea" />
        </div>
      </div>
    </>
  );
};

export default ColumnComponent;
