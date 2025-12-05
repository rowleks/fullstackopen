import { useState } from "react";

const Header = ({ text }) => <h1>{text}</h1>;

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const StatisticLine = ({ text, value }) => (
  <p>
    {text} {value}
  </p>
);

const Statistics = ({ good, neutral, bad }) => {
  if (good + neutral + bad === 0) {
    return <div>No feedback given</div>;
  }
  return (
    <div>
      <StatisticLine text="good" value={good} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />
      <StatisticLine text="all" value={good + neutral + bad} />
      <StatisticLine
        text="average"
        value={(good - bad) / (good + neutral + bad)}
      />
      <StatisticLine
        text="positive"
        value={`${(good / (good + neutral + bad)) * 100}%`}
      />
    </div>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <>
      <section>
        <Header text="give feedback" />
        <div>
          <Button onClick={() => setGood(good + 1)} text="good" />
          <Button onClick={() => setNeutral(neutral + 1)} text="neutral" />
          <Button onClick={() => setBad(bad + 1)} text="bad" />
        </div>
      </section>
      <section>
        <Header text="statistics" />
        <Statistics good={good} neutral={neutral} bad={bad} />
      </section>
    </>
  );
};

export default App;
