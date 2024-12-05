import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Login.css";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });

      // Salva os dados do usuário no localStorage (ou contexto global)
      localStorage.setItem("user", JSON.stringify(response.data.user));
      alert("Login bem-sucedido!");
      navigate("/home"); // Redireciona para a página inicial
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      alert("Credenciais inválidas.");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" onClick={handleLogin} className="login-button">
          Entrar
        </button>
      </form>
      <p>
        Não tem uma conta? <Link to="/Registrar">Cadastre-se</Link>
      </p>
    </div>
  );
};

export default Login;
