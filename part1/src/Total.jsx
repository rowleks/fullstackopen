const Total = (props) => {
  return (
    <div>
      <p>
        Number of exercises{" "}
        {props.parts.reduce((sum, part) => sum + part.exercises, 0)}
      </p>
    </div>
  );
};

export default Total;
