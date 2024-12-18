import React, { useState, useEffect } from "react";
import PlayerForm from "./PlayerForm";
import "./Addplayer.css";

const AddPlayer = ({ addPlayer, editIndex, playerToEdit, saveUpdatedPlayer, handleLogout }) => {
  const [playerData, setPlayerData] = useState(playerToEdit);

  useEffect(() => {
    if (editIndex !== null && playerToEdit) {
      setPlayerData(playerToEdit);
    }
  }, [editIndex, playerToEdit]);

  const handleInputChange = (e) => {
    setPlayerData({
      ...playerData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    saveUpdatedPlayer(playerData); // This function must be passed as a prop to this component
  };

  return (
    <div>
      <PlayerForm 
        addPlayer={addPlayer} 
        saveUpdatedPlayer={saveUpdatedPlayer} // Ensure this is being passed down
        editIndex={editIndex} 
        playerToEdit={playerData} 
      />
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
