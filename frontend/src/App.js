import React, { useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import './App.css';
import Dashboard from "./Dashboard";


// Composant principal
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}
// Page de connexion
function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // Pour rediriger
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/login", formData);
      setMessage(response.data.message);
      if (response.status === 200) {
        // Redirection vers la page de dashboard après une connexion réussie
        navigate("/dashboard");
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Erreur lors de la connexion.");
    }
  };
  return (
    <div 
    className="login-container" 
    style={{ backgroundImage: `url(${require('./assets/iStock-493881846.jpg')})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="login-box">
        <h1>Connexion</h1>
        <div className="form-group">
          <label>Email :</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Mot de passe :</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button onClick={handleLogin} className="btn btn-primary">Se connecter</button>
        {message && <p className="message">{message}</p>}  
      </div>
    </div>
  );
}
export default App;
