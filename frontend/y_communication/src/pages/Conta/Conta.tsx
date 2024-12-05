import React, { useState, useEffect } from "react";
import axios from "axios";

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
}

interface Term {
  id: number;
  descricao: string;
}

const Conta: React.FC = () => {
  const [userData, setUserData] = useState<User | null>(null);
  const [userTerms, setUserTerms] = useState<Term[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Carregar dados do usuário e termos aceitos ao montar o componente
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUserData(parsedUser);
        fetchTerms(parsedUser.id);
      } catch (error) {
        console.error("Erro ao carregar os dados do usuário:", error);
      }
    }
    setIsLoading(false);
  }, []);

  // Busca os termos aceitos pelo usuário
  const fetchTerms = async (userId: number) => {
    try {
      const response = await axios.get(`http://localhost:5000/aceitacao/${userId}`);
      setUserTerms(response.data);
    } catch (error) {
      console.error("Erro ao buscar termos aceitos:", error);
    }
  };

  // Atualiza os campos de entrada dinamicamente
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!userData) return;

    const { name, value } = e.target;
    setUserData((prevData) => (prevData ? { ...prevData, [name]: value } : null));
  };

  // Atualiza os dados do usuário no backend
  const handleUpdate = async () => {
    if (!userData) {
      alert("Usuário não encontrado.");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:5000/usuario/${userData.id}`,
        userData
      );
      alert("Informações atualizadas com sucesso!");
      localStorage.setItem("user", JSON.stringify(response.data));
    } catch (error) {
      console.error("Erro ao atualizar as informações:", error);
      alert("Erro ao atualizar as informações. Tente novamente mais tarde.");
    }
  };

  // Deleta o usuário do sistema
  const handleDelete = async () => {
    if (!userData) {
      alert("Usuário não encontrado.");
      return;
    }

    const confirmDelete = window.confirm(
      "Tem certeza de que deseja deletar sua conta? Esta ação não pode ser desfeita."
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/usuario/${userData.id}`);
      alert("Conta deletada com sucesso.");
      localStorage.removeItem("user");
      window.location.href = "/";
    } catch (error) {
      console.error("Erro ao deletar conta:", error);
      alert("Erro ao deletar a conta. Tente novamente mais tarde.");
    }
  };

  if (isLoading) {
    return <p>Carregando informações do usuário...</p>;
  }

  return (
    <div className="account-container">
      <h1>Minha Conta</h1>
      {userData ? (
        <>
          <div className="info-item">
            <label>Nome:</label>
            <input
              type="text"
              name="name"
              value={userData.name}
              onChange={handleChange}
            />
          </div>
          <div className="info-item">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
            />
          </div>
          <div className="info-item">
            <label>Telefone:</label>
            <input
              type="tel"
              name="phone"
              value={userData.phone}
              onChange={handleChange}
            />
          </div>
          <div className="info-item">
            <label>Endereço:</label>
            <input
              type="text"
              name="address"
              value={userData.address}
              onChange={handleChange}
            />
          </div>
          <div className="terms-section">
            <h3>Termos Aceitos:</h3>
            {userTerms.length > 0 ? (
              <ul>
                {userTerms.map((term) => (
                  <li key={term.id}>{term.descricao}</li>
                ))}
              </ul>
            ) : (
              <p>Nenhum termo aceito.</p>
            )}
          </div>
          <button onClick={handleUpdate} className="update-button">
            Atualizar Informações
          </button>
          <button onClick={handleDelete} className="delete-button">
            Deletar Conta
          </button>
        </>
      ) : (
        <p>Usuário não encontrado.</p>
      )}
    </div>
  );
};

export default Conta;
