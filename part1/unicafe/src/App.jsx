import { useState } from "react";

const Header = ({ text }) => <h1>{text}</h1>;

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const StatisticLine = ({ text, value }) => (
  <>
    <td>{text}</td>
    <td>{value}</td>
  </>
);

const Statistics = ({ good, neutral, bad }) => {
  if (good + neutral + bad === 0) {
    return <div>No feedback given</div>;
  }
  return (
    <table>
      <tbody>
        <tr>
          <StatisticLine text="good" value={good} />
        </tr>
        <tr>
          <StatisticLine text="neutral" value={neutral} />
        </tr>
        <tr>
          <StatisticLine text="bad" value={bad} />
        </tr>
        <tr>
          <StatisticLine text="all" value={good + neutral + bad} />
        </tr>
        <tr>
          <StatisticLine
            text="average"
            value={(good - bad) / (good + neutral + bad)}
          />
        </tr>
        <tr>
          <StatisticLine
            text="positive"
            value={`${(good / (good + neutral + bad)) * 100}%`}
          />
        </tr>
      </tbody>
    </table>
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
