const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 5000;

// Enable CORS for all routes
app.use(
  cors({
    origin: "http://localhost:3000", // Allow only requests from localhost:3000
  })
);

// Middleware
app.use(bodyParser.json());

// MySQL connection setup
const db = mysql.createConnection({
  host: "mysql-7c741d8-my-first-project-2023.a.aivencloud.com",
  port: 28546,
  user: "avnadmin",
  password: "AVNS_kH6UkI3YsxGLfZxeMK5",
  database: "defaultdb",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL");
});

// Player registration route (POST)
app.post("/api/players", (req, res) => {
  const { name, runs, strikeRate, battingAverage, totalWickets } = req.body;

  if (!name || !runs || !strikeRate || !battingAverage || !totalWickets) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const query =
    "INSERT INTO players (name, runs, strikeRate, battingAverage, totalWickets) VALUES (?, ?, ?, ?, ?)";
  db.query(
    query,
    [name, runs, strikeRate, battingAverage, totalWickets],
    (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Error registering player", error: err });
      }
      res.status(201).json({
        message: "Player registered successfully",
        playerId: result.insertId,
      });
    }
  );
});

// Get all players route (GET)
app.get("/api/players", (req, res) => {
  const query = "SELECT * FROM players";

  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Error fetching players", error: err });
    }
    res.status(200).json(results);
  });
});

// Update player details route (PUT)
app.put("/api/players/:id", (req, res) => {
  const playerId = req.params.id;
  const { name, runs, strikeRate, battingAverage, totalWickets } = req.body;

  if (!name || !runs || !strikeRate || !battingAverage || !totalWickets) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const query = `
    UPDATE players
    SET name = ?, runs = ?, strikeRate = ?, battingAverage = ?, totalWickets = ?
    WHERE id = ?
  `;

  db.query(
    query,
    [name, runs, strikeRate, battingAverage, totalWickets, playerId],
    (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Error updating player", error: err });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Player not found" });
      }

      // Fetch the updated players list
      db.query("SELECT * FROM players", (err, results) => {
        if (err) {
          return res.status(500).json({ message: "Error fetching updated players", error: err });
        }
        res.status(200).json(results);
      });
    }
  );
});

// Delete a player route (DELETE)
app.delete("/api/players/:id", (req, res) => {
  const playerId = req.params.id;

  const query = "DELETE FROM players WHERE id = ?";

  db.query(query, [playerId], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Error deleting player", error: err });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Player not found" });
    }

    res.status(200).json({ message: "Player deleted successfully" });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
