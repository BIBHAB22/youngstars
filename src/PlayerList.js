import React from "react";
import "./PlayerList.css"; // Make sure to create and link this CSS file

const PlayerList = ({ players, deletePlayer, updatePlayer }) => {
  return (
    <div>
  <h2>Player Stats</h2>
  <div className="player-list">
  <ul>
                {players.map((player, index) => (
                <li key={index}>
                    <strong>{player.name}</strong> - Runs: {player.runs}, Strike Rate: {player.strikeRate}, Batting Average: {player.battingAverage}, Wickets: {player.totalWickets}
                    <button onClick={() => updatePlayer(index)}>Edit</button>
                    <button onClick={() => deletePlayer(index)}>Delete</button>
                </li>
                ))}
            </ul>
  </div>
</div>
  );
};

export default PlayerList;
