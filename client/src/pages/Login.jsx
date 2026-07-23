import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/login.css";

export default function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const login = async (e) => {
    e.preventDefault();

    console.log("LOGIN BUTTON CLICKED");

    setLoading(true);
    setError("");

    try {
      const res = await api.post("/auth/login", {
        username,
        password,
      });

      console.log("LOGIN SUCCESS", res.data);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/dashboard");
    } catch (err) {
      console.error("LOGIN ERROR", err);

      if (err.response) {
        console.log("Status:", err.response.status);
        console.log("Data:", err.response.data);
      }

      setError(err.response?.data?.message || "Login Failed");
    }

    setLoading(false);
  };

  return (
    <div className="login-page">
      <div className="login-box">

        <h1>🍽 Appetite Kitchen</h1>
        <h3>Restaurant POS</h3>

        <form onSubmit={login}>

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p className="error">{error}</p>}

          <button
            type="submit"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

      </div>
    </div>
  );
}