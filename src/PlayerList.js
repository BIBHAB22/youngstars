import React from "react";
import "./PlayerList.css"; // Make sure to create and link this CSS file

const PlayerList = ({ players, deletePlayer, updatePlayer }) => {
  return (
    <div>
      <h2>Player Stats</h2>
      <div className="player-list">
        {players.map((player, index) => (
          <div key={index} className="player-card">
            <h3 className="player-name">{player.name}</h3>
            <p>Runs: {player.runs}</p>
            <p>Strike Rate: {player.strikeRate}</p>
            <p>Batting Average: {player.battingAverage}</p>
            <p>Wickets: {player.totalWickets}</p>
            <div className="player-actions">
              <button onClick={() => updatePlayer(index)}>Edit</button>
              <button onClick={() => deletePlayer(index)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayerList;
