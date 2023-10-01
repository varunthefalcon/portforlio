const SVGRenderer = (props) => {
  const { content = "" } = props;
  if (!!!content) return "";
  return (
    <>
      <h3>Word Cloud</h3>
      <img width="100%" src={`data:image/svg+xml;utf8,${content}`} />
      <br />
    </>
  );
};

export default SVGRenderer;
