// App.js
import "./App.css";
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import PlayerList from "./PlayerList";
import Navbar from "./Components/Navbar";
import Login from "./Login";
import AddPlayer from "./AddPlayer";
import Scoreboard from "./Scoreboard";

const App = () => {
  const [players, setPlayers] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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

  const [runs, setRuns] = useState(0);
  const [batsman, setBatsman] = useState("");
  const [bowler, setBowler] = useState("");

  const addPlayer = (player) => {
    setPlayers([...players, player]);
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
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };
  const handleRunInput = () => {
    if (runs <= 0 || !batsman || !bowler) {
      alert("Please fill all fields correctly!");
      return;
    }

    // Update team score and current over
    setTeamScore((prevScore) => prevScore + runs);

    // Update the current over (max 6 balls per over)
    setCurrentOver((prevOver) => {
      const newOver = [...prevOver, runs];
      return newOver.length > 6 ? newOver.slice(-6) : newOver;
    });

    // Update batsman's runs
    setBatsmanRuns((prevRuns) => ({
      ...prevRuns,
      [batsman]: (prevRuns[batsman] || 0) + runs,
    }));

    // Update bowler's balls
    setBowlerBalls((prevBalls) => ({
      ...prevBalls,
      [bowler]: (prevBalls[bowler] || 0) + 1,
    }));

    // Reset the run input field after adding a run
    setRuns(0);
  };

  const handleWicket = () => {
    if (!bowler) {
      alert("Please enter the bowler's name!");
      return;
    }

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
          {/* Home page with player list */}
          <Route
            path="/"
            element={
              isLoggedIn ? (
                <div className="home-page-background">
                  <div className="home-page">
                    <PlayerList
                      players={players}
                      deletePlayer={deletePlayer}
                      updatePlayer={updatePlayer}
                    />
                  </div>
                </div>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          {/* Login page */}
          <Route
            path="/login"
            element={
              isLoggedIn ? (
                <Navigate to="/" />
              ) : (
                <Login onLoginSuccess={handleLoginSuccess} />
              )
            }
          />

          {/* Add Player page */}
          <Route
            path="/add-player"
            element={
              isLoggedIn ? (
                <AddPlayer
                  addPlayer={addPlayer}
                  editIndex={editIndex}
                  playerToEdit={playerToEdit}
                  saveUpdatedPlayer={saveUpdatedPlayer}
                  handleLogout={handleLogout}
                />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          {/* Scoreboard page */}
          <Route
            path="/scoreboard"
            element={
              isLoggedIn ? (
                <Scoreboard
                  teamScore={teamScore}
                  wickets={wickets}
                  currentOver={currentOver}
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
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
