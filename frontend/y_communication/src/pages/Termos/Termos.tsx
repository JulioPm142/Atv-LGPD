import React, { useState, useEffect } from "react";
import axios from "axios";

interface Termo {
  descricao: string;
  id: string;
}

const Termos: React.FC = () => {
  const [descricao, setDescricao] = useState("");
  const [termos, setTermos] = useState<Termo[]>([]); // Corrigir para array de Termos

  const fetchTermos = async () => {
    try {
      const response = await axios.get("http://localhost:5000/termo");
      setTermos(response.data); // Assumindo que response.data é um array
    } catch (error) {
      console.error("Erro ao buscar termos:", error);
    }
  };

  const handleCreate = async () => {
    try {
      await axios.post("http://localhost:5000/termo", { descricao });
      setDescricao(""); // Limpar o campo de descrição após criar o termo
      fetchTermos(); // Atualizar a lista de termos
    } catch (error) {
      console.error("Erro ao criar termo:", error);
    }
  };

  useEffect(() => {
    fetchTermos(); // Carregar termos ao montar o componente
  }, []);

  return (
    <div>
      <h1>Termos</h1>
      <input
        type="text"
        placeholder="Descrição do Termo"
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
      />
      <button onClick={handleCreate}>Criar Termo</button>
      <h3>Lista de Termos</h3>
      <ul>
        {termos.length > 0 ? (
          termos.map((termo) => (
            <li key={termo.id}>{termo.descricao}</li>
          ))
        ) : (
          <p>Nenhum termo encontrado.</p>
        )}
      </ul>
    </div>
  );
};

export default Termos;
