import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import PlayerList from "./PlayerList";
import Navbar from "./Components/Navbar";
import Login from "./Login";
import AddPlayer from "./AddPlayer";
import Scoreboard from "./Scoreboard";
import PlayerForm from "./PlayerForm";
import PlayersPage from "./PlayersPage";

const App = () => {
  const [players, setPlayers] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);  // Make sure this is initially false
  const [playerToEdit, setPlayerToEdit] = useState({
    name: "",
    runs: "",
    strikeRate: "",
    battingAverage: "",
    totalWickets: "",
  });

  const [currentOver, setCurrentOver] = useState([]);
  const [teamScore, setTeamScore] = useState(0);
  const [batsmanRuns, setBatsmanRuns] = useState({});
  const [bowlerBalls, setBowlerBalls] = useState({});
  const [wickets, setWickets] = useState(0);
  const [dotBalls, setDotBalls] = useState(0); // New state for dot balls
  const [runs, setRuns] = useState(0);
  const [batsman, setBatsman] = useState("");
  const [bowler, setBowler] = useState("");

  const addPlayer = (player) => {
    setPlayers([...players, player]);
    window.location.href = '/players';  // Redirect to the Players page after adding the player
  };

  const deletePlayer = (index) => {
    setPlayers(players.filter((_, i) => i !== index));
  };

  const updatePlayer = (index) => {
    const player = players[index];
    setEditIndex(index);
    setPlayerToEdit(player);
  };

  const saveUpdatedPlayer = (updatedPlayer) => {
    const updatedPlayers = [...players];
    updatedPlayers[editIndex] = updatedPlayer;
    setPlayers(updatedPlayers);
    setEditIndex(null);
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);  // Ensure this sets the login status
  };

  const handleLogout = () => {
    setIsLoggedIn(false);  // Ensure this sets the logout status
  };

  const handleRunInput = () => {
    setTeamScore((prevScore) => prevScore + runs);
    setCurrentOver((prevOver) => {
      const newOver = [...prevOver, runs];
      return newOver.length > 6 ? newOver.slice(-6) : newOver;
    });

    if (runs === 0) {
      setDotBalls((prevDotBalls) => prevDotBalls + 1);
    }

    setBatsmanRuns((prevRuns) => ({
      ...prevRuns,
      [batsman]: (prevRuns[batsman] || 0) + runs,
    }));

    setBowlerBalls((prevBalls) => ({
      ...prevBalls,
      [bowler]: (prevBalls[bowler] || 0) + 1,
    }));

    setRuns(0); // Reset the run input field after adding a run
  };

  const handleWicket = () => {
    if (!bowler) return; // Skip if bowler name is missing

    setWickets((prevWickets) => prevWickets + 1);

    setBowlerBalls((prevBalls) => ({
      ...prevBalls,
      [bowler]: (prevBalls[bowler] || 0) + 1,
    }));

    setBatsman("");
  };

  return (
    <Router>
      <div>
        <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        <Routes>
          <Route
            path="/"
            element={isLoggedIn ? <div className="home-page"></div> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={isLoggedIn ? <Navigate to="/players" /> : <Navigate to="/players" />}
          />
          <Route
            path="/add-player"
            element={isLoggedIn ? (
              <PlayerForm
                addPlayer={addPlayer}
                editIndex={editIndex}
                playerToEdit={playerToEdit}
                saveUpdatedPlayer={saveUpdatedPlayer}
                handleLogout={handleLogout}
              />
            ) : (
              <Navigate to="/login" />
            )}
          />
          <Route
            path="/players"
            element={isLoggedIn ? (
              <PlayersPage players={players} />
            ) : (
              <Navigate to="/login" />
            )}
          />
          <Route
            path="/scoreboard"
            element={isLoggedIn ? (
              <Scoreboard
                teamScore={teamScore}
                wickets={wickets}
                currentOver={currentOver}
                dotBalls={dotBalls}
                runs={runs}
                batsman={batsman}
                bowler={bowler}
                setRuns={setRuns}
                setBatsman={setBatsman}
                setBowler={setBowler}
                handleRunInput={handleRunInput}
                handleWicket={handleWicket}
              />
            ) : (
              <Navigate to="/login" />
            )}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
