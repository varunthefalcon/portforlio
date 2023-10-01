const TagRenderer = (props) => {
  const {
    skills = [],
    label = "",
    target_skills = [],
    infoComp = "",
    noTargetCheck,
  } = props;

  const t_skills = target_skills.map((e) => e.toLowerCase());

  return (
    <>
      {!!skills.length && (
        <>
          <h3>
            {label} {infoComp}{" "}
          </h3>
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

export default TagRenderer;
