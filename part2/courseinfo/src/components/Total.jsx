const Total = ({ parts }) => {
  const totalExercises = parts.reduce((sum, part) => sum + part.exercises, 0);
  return (
    <div>
      <b>
        Total of {""}
        {totalExercises} exercises
      </b>
    </div>
  );
};

export default Total;
