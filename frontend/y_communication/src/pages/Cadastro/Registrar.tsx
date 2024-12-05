import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Registrar.css";

interface Termo {
  descricao: string;
  id: number;
}

const Registrar: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [termos, setTermos] = useState<Termo[]>([]);
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [termoAceito, setTermoAceito] = useState<number | null>(null);

  useEffect(() => {
    // Buscar termos
    axios.get("http://localhost:5000/termo").then((response) => {
      setTermos(response.data);
    });
  }, []);

  const handleRegister = async () => {
    if (termos.length > 0 && !termoAceito) {
      alert("Você precisa aceitar um termo.");
      return;
    }

    if (password !== confirmPassword) {
      alert("As senhas não coincidem!");
      return;
    }
    try {

      const response = await axios.post("http://localhost:5000/usuario", {
        name,
        email,
        password,
        address,
        phone
      });

      // Salva os dados do usuário no localStorage
      localStorage.setItem("user", JSON.stringify(response.data.user));

      // Registra aceitação do termo
      if (termos.length > 0) {
        await axios.post("http://localhost:5000/aceitacao", {
          usuario_id: response.data.id,
          termo_id: termoAceito,
        });
      }

      alert("Usuário registrado com sucesso.");
    } catch (error) {
      console.error("Erro ao registrar:", error);
      alert("Erro ao registrar.");
    }
  };

  return (
    <div className="register-container">
      <h2>Cadastrar</h2>
      <form>
        <div className="form-group">
          <label htmlFor="name">Nome:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
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
          <label htmlFor="phone">Telefone:</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Endereço:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
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

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirmar Senha:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          {/* <h3>Termos</h3> */}
          {termos.map((termo) => (
            <div key={termo.id}>
              <input
                type="radio"
                name="termo"
                value={termo.id}
                onChange={() => setTermoAceito(termo.id)}
              />
              {termo.descricao}
            </div>
          ))}
        </div>
        
        <button
          onClick={handleRegister}
          type="submit"
          className="register-button"
        >
          Registrar
        </button>
      </form>
    </div>
  );
};

export default Registrar;
