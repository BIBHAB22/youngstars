import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import axios from "axios"; // Import axios for API calls
import PlayerList from "./PlayersList";
import Navbar from "./Components/Navbar";
import Login from "./Login";
import AddPlayer from "./AddPlayer";
import Scoreboard from "./Scoreboard";
import PlayerForm from "./PlayerForm";

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
  const [dotBalls, setDotBalls] = useState(0); // New state for dot balls
  const [runs, setRuns] = useState(0);
  const [batsman, setBatsman] = useState("");
  const [bowler, setBowler] = useState("");

  // Fetch players from the backend
  const fetchPlayers = async () => {
    try {
      const response = await axios.get("/api/players");
      setPlayers(response.data);
    } catch (error) {
      console.error("Error fetching players", error);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchPlayers(); // Fetch players only when logged in
    }
  }, [isLoggedIn]);

  const addPlayer = async (player) => {
    try {
      const response = await axios.post("http://localhost:5000/api/players", player);
      setPlayers([...players, response.data]); // Add player to local state after successful API call
    } catch (error) {
      console.error("Error adding player", error);
    }
  };

  const deletePlayer = async (index) => {
    const player = players[index];
    try {
      await axios.delete(`/api/players/${player.id}`); // Delete player from backend
      setPlayers(players.filter((_, i) => i !== index)); // Remove player from local state after deletion
    } catch (error) {
      console.error("Error deleting player", error);
    }
  };

  const updatePlayer = async (index) => {
    const player = players[index];
    setEditIndex(index);
    setPlayerToEdit(player);
  };

  const saveUpdatedPlayer = async (updatedPlayer) => {
    console.log("Updating player:", updatedPlayer); // Add this log
    try {
      const response = await axios.put(`/api/players/${updatedPlayer.id}`, updatedPlayer);
      const updatedPlayers = players.map((player) =>
        player.id === updatedPlayer.id ? response.data : player
      );
      setPlayers(updatedPlayers);
      setEditIndex(null); // Reset the edit form
    } catch (error) {
      console.error("Error updating player", error);
    }
  };
  

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleRunInput = () => {
    // Update team score and current over
    setTeamScore((prevScore) => prevScore + runs);

    setCurrentOver((prevOver) => {
      const newOver = [...prevOver, runs];
      return newOver.length > 6 ? newOver.slice(-6) : newOver;
    });

    // Update dot ball count
    if (runs === 0) {
      setDotBalls((prevDotBalls) => prevDotBalls + 1);
    }

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
            element={
              isLoggedIn ? (
                <div className="home-page-background">
                  <div className="home-page"></div>
                </div>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/login"
            element={isLoggedIn ? <Navigate to="/" /> : <Login onLoginSuccess={handleLoginSuccess} />}
          />
          <Route
            path="/players"
            element={
              isLoggedIn ? (
                <PlayerList players={players} deletePlayer={deletePlayer} updatePlayer={updatePlayer} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/add-player"
            element={
              isLoggedIn ? (
                <PlayerForm
                  addPlayer={addPlayer}
                  editIndex={editIndex}
                  playerToEdit={playerToEdit}
                  handleLogout={handleLogout}
                />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/scoreboard"
            element={
              isLoggedIn ? (
                <Scoreboard
                  teamScore={teamScore}
                  wickets={wickets}
                  currentOver={currentOver}
                  dotBalls={dotBalls} // Pass dot balls
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
