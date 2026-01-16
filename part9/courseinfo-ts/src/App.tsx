interface CoursePartBase {
  name: string;
  exerciseCount: number;
  description: string;
}

interface CoursePartBasic extends CoursePartBase {
  kind: "basic";
}

interface CoursePartGroup extends Omit<CoursePartBase, "description"> {
  groupProjectCount: number;
  kind: "group";
}

interface CoursePartBackground extends CoursePartBase {
  backgroundMaterial: string;
  kind: "background";
}

interface CoursePartRequirement extends CoursePartBase {
  requirements: string[];
  kind: "special";
}

type CoursePart =
  | CoursePartBasic
  | CoursePartGroup
  | CoursePartBackground
  | CoursePartRequirement;

const Header = ({ name }: { name: string }) => {
  return <h1>{name}</h1>;
};

const Part = ({ part }: { part: CoursePart }) => {
  switch (part.kind) {
    case "basic": {
      return (
        <div>
          <h3>
            {part.name} {part.exerciseCount}
          </h3>
          <i>{part.description}</i>
        </div>
      );
    }
    case "group": {
      return (
        <div>
          <h3>
            {part.name} {part.exerciseCount}
          </h3>
          <p>group projects: {part.groupProjectCount}</p>
        </div>
      );
    }
    case "background": {
      return (
        <div>
          <h3>
            {part.name} {part.exerciseCount}
          </h3>
          <i>{part.description}</i>
          <p>
            background material:{" "}
            <a href={part.backgroundMaterial}>{part.backgroundMaterial}</a>
          </p>
        </div>
      );
    }
    case "special": {
      return (
        <div>
          <h3>
            {part.name} {part.exerciseCount}
          </h3>
          <i>{part.description}</i>
          <p>required skills: {part.requirements.join(", ")}</p>
        </div>
      );
    }
    default: {
      const _exhaustiveCheck: never = part;
      return _exhaustiveCheck;
    }
  }
};

const Content = ({ parts }: { parts: CoursePart[] }) => {
  return (
    <div className="space-y-4 divide-y">
      {parts.map((part) => (
        <div key={part.name} className="py-3">
          <Part part={part} />
        </div>
      ))}
    </div>
  );
};

const Total = ({ total }: { total: number }) => {
  return <h3>Number of exercises: {total}</h3>;
};

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic",
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group",
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic",
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial:
        "https://type-level-typescript.com/template-literal-types",
      kind: "background",
    },
    {
      name: "TypeScript in frontend",
      exerciseCount: 10,
      description: "a hard part",
      kind: "basic",
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      kind: "special",
    },
  ];

  const totalExercises = courseParts.reduce(
    (sum, part) => sum + part.exerciseCount,
    0
  );

  return (
    <div className="space-y-6">
      <Header name={courseName} />
      <Content parts={courseParts} />
      <Total total={totalExercises} />
    </div>
  );
};

export default App;
