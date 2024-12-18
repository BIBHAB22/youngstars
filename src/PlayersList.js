import React, { useState, useEffect } from "react";
import axios from "axios";
import "./PlayerList.css";
import PlayerForm from "./PlayerForm"; // Assuming you have a PlayerForm component

const PlayerList = () => {
  const [players, setPlayers] = useState([]);
  const [editingPlayer, setEditingPlayer] = useState(null); // For storing the player being edited
  const [isModalOpen, setIsModalOpen] = useState(false); // To manage modal visibility

  // Function to fetch players data
  const fetchPlayers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/players");
      setPlayers(response.data);
    } catch (error) {
      console.error("Error fetching players:", error);
    }
  };

  // Fetch players on component mount and set up polling
  useEffect(() => {
    fetchPlayers(); // Initial fetch

    const interval = setInterval(() => {
      fetchPlayers(); // Fetch data every 2 seconds
    }, 2000);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  // Handle editing a player
  const handleEdit = (playerId) => {
    const playerToEdit = players.find((player) => player.id === playerId);
    if (playerToEdit) {
      setEditingPlayer(playerToEdit); // Set the player to be edited
      setIsModalOpen(true); // Open the modal
    }
  };

  // Handle deleting a player
  const handleDelete = async (playerId) => {
    try {
      await axios.delete(`http://localhost:5000/api/players/${playerId}`);
      fetchPlayers(); // Refresh players list after deletion
      console.log("Player deleted successfully");
    } catch (error) {
      console.error("Error deleting player:", error);
    }
  };

  // Handle closing the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setEditingPlayer(null); // Clear editing player data when closing the modal
  };

  return (
    <div className="player-list-container">
      <h2>Player Stats</h2>
      <div className="player-list">
        {players.map((player) => (
          <div key={player.id} className="player-card">
            <div className="player-card-header">
              <strong className="player-name">{player.name}</strong>
              <div className="player-stats">
                <p>Runs: {player.runs}</p>
                <p>Strike Rate: {player.strikeRate}</p>
                <p>Batting Average: {player.battingAverage}</p>
                <p>Total Wickets: {player.totalWickets}</p>
              </div>
            </div>
            <div className="player-actions">
              <button className="edit" onClick={() => handleEdit(player.id)}>
                Edit
              </button>
              <button
                className="delete"
                onClick={() => handleDelete(player.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()} // Prevent modal close on content click
          >
            <h3>Edit Profile</h3>
            <PlayerForm
              playerToEdit={editingPlayer}
              setEditingPlayer={setEditingPlayer}
              setPlayers={setPlayers}
              closeModal={closeModal}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PlayerList;
