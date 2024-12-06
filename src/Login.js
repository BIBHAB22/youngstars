import React, { useState } from "react";
import "./Login.css";

const Login = ({ onLoginSuccess }) => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, password } = credentials;

    // Mock validation (you can replace this with an actual authentication process)
    if (username === "Youngstars" && password === "111") {
      setError("");
      onLoginSuccess();
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="username"
            value={credentials.username}
            onChange={handleChange}
            placeholder="Username"
            required
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;

