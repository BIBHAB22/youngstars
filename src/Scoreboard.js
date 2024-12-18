import React, { useState } from "react";
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
  const [totalBalls, setTotalBalls] = useState(0);
  const [currentOverBalls, setCurrentOverBalls] = useState([]);
  const [batsmanStats, setBatsmanStats] = useState({});
  const [bowlerStats, setBowlerStats] = useState({});
  const [currentBatsmanRuns, setCurrentBatsmanRuns] = useState(0);
  const [currentBowlerRuns, setCurrentBowlerRuns] = useState(0);
  const [currentBowlerWickets, setCurrentBowlerWickets] = useState(0);
  const [newBatsmanNeeded, setNewBatsmanNeeded] = useState(false);
  const [matchOvers, setMatchOvers] = useState(null); // Total overs for the match
  const [matchWickets, setMatchWickets] = useState(null); // Total wickets allowed
  const [isMatchStarted, setIsMatchStarted] = useState(false);

  const handleRunChange = (e) => {
    const inputRuns = parseInt(e.target.value) || 0;
    if (inputRuns > 7) {
      alert("A batsman cannot score more than 7 runs on a single ball.");
      setRuns(7);
    } else {
      setRuns(inputRuns);
    }
  };

  const handleBatsmanChange = (e) => setBatsman(e.target.value);
  const handleBowlerChange = (e) => setBowler(e.target.value);

  const handleAddWicket = () => {
    if (batsman === "") {
      alert("Please enter batsman name before adding a wicket.");
      return;
    }

    if (wickets >= matchWickets) {
      alert("All wickets are down. Match over!");
      return;
    }

    // Update batsman stats
    setBatsmanStats({
      ...batsmanStats,
      [batsman]: currentBatsmanRuns,
    });

    // Update bowler stats for wickets taken
    setBowlerStats({
      ...bowlerStats,
      [bowler]: {
        runsConceded: (bowlerStats[bowler]?.runsConceded || 0) + currentBowlerRuns,
        wickets: (bowlerStats[bowler]?.wickets || 0) + 1,
        overs: Math.floor((totalBalls + 1) / 6),
      },
    });

    // Reset the current batsman stats
    setCurrentBatsmanRuns(0);

    // Update balls and require a new batsman
    setTotalBalls(totalBalls + 1);
    setCurrentOverBalls([...currentOverBalls, "W"]);
    handleWicket();

    setNewBatsmanNeeded(true);
    setCurrentBowlerWickets(currentBowlerWickets + 1);
  };

  const handleAddRun = () => {
    if (newBatsmanNeeded) {
      alert("Please add a new batsman before adding runs.");
      return;
    }

    const maxBalls = matchOvers * 6;
    if (totalBalls >= maxBalls) {
      alert("Overs completed. Match over!");
      return;
    }

    // Update batsman stats
    setCurrentBatsmanRuns(currentBatsmanRuns + runs);

    // Update bowler stats for runs conceded
    setBowlerStats({
      ...bowlerStats,
      [bowler]: {
        runsConceded: (bowlerStats[bowler]?.runsConceded || 0) + runs,
        wickets: bowlerStats[bowler]?.wickets || 0,
        overs: Math.floor((totalBalls + 1) / 6),
      },
    });

    // Update balls and overs
    setTotalBalls(totalBalls + 1);
    setCurrentOverBalls([...currentOverBalls, runs]);
    handleRunInput();
  };

  const handleNewBatsman = () => {
    if (batsman === "") {
      alert("Please enter batsman name.");
      return;
    }
    setNewBatsmanNeeded(false);
  };

  const handleStartMatch = () => {
    if (!matchOvers || !matchWickets) {
      alert("Please set the total overs and wickets before starting the match.");
      return;
    }
    setIsMatchStarted(true);
  };

  const overs = Math.floor(totalBalls / 6);
  const balls = totalBalls % 6;

  return (
    
    <div className="scoreboard">
      <h2>Live Cricket Scoreboard</h2>

      {!isMatchStarted ? (
        <div className="match-setup">
          <h3>Match Setup</h3>
          <input
            type="number"
            placeholder="Total Overs"
            onChange={(e) => setMatchOvers(parseInt(e.target.value) || null)}
          />
          <input
            type="number"
            placeholder="Total Wickets"
            onChange={(e) => setMatchWickets(parseInt(e.target.value) || null)}
          />
          <button onClick={handleStartMatch}>Start Match</button>
        </div>
      ) : (
        
        <div>
          <p>
            <strong>Total Overs:</strong> {matchOvers}
          </p>
          <p>
            <strong>Total Wickets:</strong> {matchWickets}
          </p>
        </div>
      )}

      {isMatchStarted && (
        <>
          <div className="scorecard-section">
            <div className="live-scorecard">
              <p>
                <strong>Team Score:</strong> {teamScore}/{wickets}
              </p>
              <p>
                <strong>Current Over:</strong> {currentOverBalls.join(" ")}
              </p>
              <p>
                <strong>Total Overs:</strong> {overs}.{balls}
              </p>
            </div>
            <div className="stats-section">
              <div className="batsman-stats">
                <h3>Batsman Stats</h3>
                <p>
                  <strong>Current Batsman:</strong> {batsman} - {currentBatsmanRuns} runs
                </p>
                {Object.entries(batsmanStats).map(([name, runs]) => (
                  <p key={name}>
                    {name}: {runs} runs
                  </p>
                ))}
              </div>

              <div className="bowler-stats">
                <h3>Bowler Stats</h3>
                <p>
                  <strong>Current Bowler:</strong> {bowler}
                </p>
                {Object.entries(bowlerStats).map(([name, stats]) => (
                  <p key={name}>
                    {name}: {stats.overs} overs, {stats.wickets} wickets,{" "}
                    {stats.runsConceded} runs
                  </p>
                ))}
              </div>
            </div>

            
          </div>

          {
            newBatsmanNeeded ? <div>
            <input
              type="text"
              placeholder="New Batsman Name"
              value={batsman}
              onChange={handleBatsmanChange}
            />
            <button onClick={handleNewBatsman}>Add New Batsman</button>
          </div> : <div className="simulation">
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
            <button onClick={handleAddRun}>Add Run</button>
            <button onClick={handleAddWicket}>Add Wicket</button>
          </div>
          }
        </>
      )}
    </div>
  );
};

export default Scoreboard;
