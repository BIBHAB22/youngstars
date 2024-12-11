import React from "react";
import "./Scoreboard.css";

const Scoreboard = ({
  teamScore,
  wickets,
  currentOver,
  runs,
  batsman,
  bowler,
  setRuns,
  setBatsman,
  setBowler,
  handleRunInput,
  handleWicket,

}) => {
  const handleRunChange = (e) => setRuns(parseInt(e.target.value) || 0);
  const handleBatsmanChange = (e) => setBatsman(e.target.value);
  const handleBowlerChange = (e) => setBowler(e.target.value);

  return (
    <div className="scoreboard">
      <h2>Live Cricket Scoreboard</h2>
      <p>
        <strong>Team Score:</strong> {teamScore}/{wickets}
      </p>
      <p>
        <strong>Current Over:</strong> {currentOver.join(", ")}
      </p>

      <div className="simulation">
        <h3>Simulate Match Input</h3>
        <input
          type="number"
          placeholder="Runs Scored"
          value={runs}
          onChange={handleRunChange}
        />
        <input
          type="text"
          placeholder="Batsman Name"
          value={batsman}
          onChange={handleBatsmanChange}
        />
        <input
          type="text"
          placeholder="Bowler Name"
          value={bowler}
          onChange={handleBowlerChange}
        />
        <button onClick={handleRunInput}>Add Run</button>
        <button onClick={handleWicket}>Add Wicket</button>
      </div>
    </div>
  );
};

export default Scoreboard;

