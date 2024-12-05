import React, { useState, useEffect } from "react";
import axios from "axios";

interface Termo {
  descricao: string;
  id: number;
}

const Registrar: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [termos, setTermos] = useState<Termo[]>([]); 
  const [termoAceito, setTermoAceito] = useState<number | null>(null);

  useEffect(() => {
    // Buscar termos
    axios.get("http://localhost:5000/termo").then((response) => {
      setTermos(response.data);
    });
  }, []);

  const handleRegister = async () => {
    if (!termoAceito) {
      alert("Você precisa aceitar um termo.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/usuario", {
        name,
        email,
        password,
      });

      // Registra aceitação do termo
      await axios.post("http://localhost:5000/aceitacao", {
        usuario_id: response.data.id,
        termo_id: termoAceito,
      });

      alert("Usuário registrado com sucesso.");
    } catch (error) {
      console.error("Erro ao registrar:", error);
      alert("Erro ao registrar.");
    }
  };

  return (
    <div>
      <h1>Registrar</h1>
      <input
        type="text"
        placeholder="Nome"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div>
        <h3>Termos</h3>
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
      <button onClick={handleRegister}>Registrar</button>
    </div>
  );
};

export default Registrar;
