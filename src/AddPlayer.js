// AddPlayer.js
import React, { useState } from "react";
import PlayerForm from "./PlayerForm";
import "./Addplayer.css";

const AddPlayer = ({ addPlayer, editIndex, playerToEdit, saveUpdatedPlayer, handleLogout }) => {
  const [playerData, setPlayerData] = useState(playerToEdit);

  const handleInputChange = (e) => {
    setPlayerData({
      ...playerData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    saveUpdatedPlayer(playerData);
  };

  return (
    <div>
      <PlayerForm addPlayer={addPlayer} />
      {editIndex !== null && (
        <form className="edit-form" onSubmit={handleSave}>
          <input
            type="text"
            name="name"
            value={playerData.name}
            onChange={handleInputChange}
            placeholder="Player Name"
            required
          />
          <button type="submit">Save Changes</button>
        </form>
      )}
    </div>
  );
};

export default AddPlayer;
