import { useState } from "react";
import axios from "axios";
import login_side from "../assets/login_side.jpg"
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("http://localhost:8000/api/token/", {
        username,
        password,
      });

      const { access, refresh } = response.data;

      // Save tokens in localStorage
      localStorage.setItem("access_token", access);
      localStorage.setItem("refresh_token", refresh);

      console.log("Login successful!");
      navigate("/")
    } catch (err) {
      setError(err.response?.data?.detail || "Invalid credentials. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-tray">
        <div className="image-container">
          <img src={login_side} alt="" />
        </div>
        <div className="form-container">
          <form onSubmit={handleLogin}>
          <h2>Welcome Back!</h2>
          {error && <p className="error">{error}</p>}

          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button>Sign In</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;


{/* <img src={login_side} alt="" />
      <form onSubmit={handleLogin}>
        <h2>Welcome Back!</h2>
        {error && <p className="error">{error}</p>}

        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form> */}