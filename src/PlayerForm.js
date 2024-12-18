import React, { useState, useEffect } from "react";
import axios from "axios";

const PlayerForm = ({ addPlayer, editIndex, playerToEdit = {} }) => {
  const [player, setPlayer] = useState({
    name: "",
    runs: "",
    strikeRate: "",
    battingAverage: "",
    totalWickets: "",
  });

  // Populate form when editing a player
  useEffect(() => {
    if (editIndex !== null && playerToEdit) {
      setPlayer(playerToEdit);
    }
  }, [editIndex, playerToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlayer({
      ...player,
      [name]: value,
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    if (editIndex !== null) {
      // Save updated player when editing
        const response = await axios.put(`http://localhost:5000/api/players/${player.id}`, player);
        console.log(response);
    
    } else {
      // Add new player
      addPlayer(player);
    }

    // Reset form after submission
    setPlayer({
      name: "",
      runs: "",
      strikeRate: "",
      battingAverage: "",
      totalWickets: "",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={player.name || ""}
        onChange={handleChange}
        placeholder="Player Name"
        required
      />
      <input
        type="number"
        name="runs"
        value={player.runs || ""}
        onChange={handleChange}
        placeholder="Runs"
        required
      />
      <input
        type="number"
        name="strikeRate"
        value={player.strikeRate || ""}
        onChange={handleChange}
        placeholder="Strike Rate"
        required
      />
      <input
        type="number"
        name="battingAverage"
        value={player.battingAverage || ""}
        onChange={handleChange}
        placeholder="Batting Average"
        required
      />
      <input
        type="number"
        name="totalWickets"
        value={player.totalWickets || ""}
        onChange={handleChange}
        placeholder="Total Wickets"
        required
      />
      <button type="submit">
        {editIndex !== null ? "Save Changes" : "Add Player"}
      </button>
    </form>
  );
};


export default PlayerForm;
