import React from "react";

const PlayersPage = ({ players }) => {
  return (
    <div>
      <h2>Players List</h2>
      {players.length === 0 ? (
        <p>No players available.</p>
      ) : (
        <ul>
          {players.map((player, index) => (
            <li key={index}>
              <strong>{player.name}</strong>
              <p>Runs: {player.runs}</p>
              <p>Strike Rate: {player.strikeRate}</p>
              <p>Batting Average: {player.battingAverage}</p>
              <p>Total Wickets: {player.totalWickets}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PlayersPage;
