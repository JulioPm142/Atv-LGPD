import React, { useState, useEffect } from "react";
import "./Conta.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileContract } from "@fortawesome/free-solid-svg-icons";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

const termsData = [
  {
    titulo: "Termo 1",
    id: "1",
    descricao: "Descrição do Termo 1",
    obrigatorio: true,
    aceito: true,
  },
  {
    titulo: "Termo 2",
    id: "2",
    descricao: "Descrição do Termo 2",
    obrigatorio: false,
    aceito: false,
  },
  {
    titulo: "Termo 3",
    id: "3",
    descricao: "Descrição do Termo 3",
    obrigatorio: false,
    aceito: false,
  },
];

interface Termo {
  descricao: string;
  id: string;
}

const Account: React.FC = () => {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "+55 12 3456-7890",
    address: "Rua Exemplo, 123, São José dos Campos, SP, Brasil",
  });

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showTerms, setShowTerms] = useState(false);
  const [terms, setTerms] = useState(termsData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevState) => ({ ...prevState, [name]: value }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswords((prevState) => ({ ...prevState, [name]: value }));
  };

  const navigate = useNavigate();

  const handleSave = () => {
    // Criar o objeto no formato solicitado
    const requestBody = {
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
      terms: terms.map((term, index) => ({
        id: (index + 1).toString(), // ID baseado no índice + 1
        titulo: term.titulo,
        accepted: term.aceito,
      })),
    };

    console.log("Dados enviados ao backend:", requestBody);
  };

  const DeletarConta = () => {};

  const handleBack = () => {
    navigate("/");
  };

  const handlePasswordSave = () => {
    if (passwords.newPassword === passwords.confirmPassword) {
      console.log("Senha alterada:", passwords.newPassword);
    } else {
      console.log("As senhas não coincidem");
    }
  };

  const toggleTerms = () => {
    setShowTerms(!showTerms);
  };

  const handleTermChange = (index: number) => {
    const updatedTerms = terms.map((term, i) =>
      i === index ? { ...term, aceito: !term.aceito } : term
    );
    setTerms(updatedTerms);
  };

  const [termosAceitos, setTermosAceitos] = useState<Termo[]>([]); // Corrigir para array de Termos

  useEffect(() => {
    const userId = 1; // Substituir pelo ID real do usuário logado
    axios
      .get(`http://localhost:5000/aceitacao/${userId}`)
      .then((response) => setTermosAceitos(response.data))
      .catch((error) => console.error("Erro ao buscar termos aceitos:", error));
  }, []);

  return (
    <div className="account">
      <h1>Minha Conta</h1>
      <div className="account-info">
        <div className="info-item">
          <label>Nome:</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
          />
        </div>
        <div className="info-item">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
          />
        </div>
        <div className="info-item">
          <label>Telefone:</label>
          <input
            type="tel"
            name="phone"
            value={user.phone}
            onChange={handleChange}
          />
        </div>
        <div className="info-item">
          <label>Endereço:</label>
          <input
            type="text"
            name="address"
            value={user.address}
            onChange={handleChange}
          />
        </div>

        <div className="terms-of-use">
          <button className="terms-button" onClick={toggleTerms}>
            <FontAwesomeIcon icon={faFileContract} className="terms-icon" />
            Termos de Uso
          </button>
        </div>
      </div>

      {showTerms && (
        <div className="terms-container">
          <h2>Termos de Uso</h2>
          {terms.map((term, index) => (
            <div key={`${index}-${term.aceito}`} className="term-item">
              <h3>{term.titulo}</h3>
              <p>{term.descricao}</p>
              {term.obrigatorio ? (
                <p className="term-obrigatorio">Termo Obrigatório</p>
              ) : (
                <div className="term-footer">
                  <label>
                    <input
                      type="checkbox"
                      checked={term.aceito}
                      onChange={() => handleTermChange(index)}
                    />{" "}
                    Aceito
                  </label>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      <div>
        <h1>Minha Conta</h1>
        <h3>Termos Aceitos</h3>
        <ul>
          {termosAceitos.map((termo) => (
            <li key={termo.id}>{termo.descricao}</li>
          ))}
        </ul>
      </div>

      <div className="account-buttons">
        <button onClick={handleBack}>Voltar</button>
        <button onClick={handleSave}>Salvar</button>
      </div>
      <div className="change-password">
        <h2>Alterar Senha</h2>
        <div className="password-item">
          <label>Senha Atual:</label>
        </div>
        <div className="password-input">
          <input
            type="password"
            name="currentPassword"
            value={passwords.currentPassword}
            onChange={handlePasswordChange}
            placeholder="Senha Atual"
          />
        </div>
        <div className="password-item">
          <label>Nova Senha:</label>
        </div>
        <div className="password-input">
          <input
            type="password"
            name="newPassword"
            value={passwords.newPassword}
            onChange={handlePasswordChange}
            placeholder="Nova Senha"
          />
        </div>
        <div className="password-item">
          <label>Confirmar Senha:</label>
        </div>
        <div className="password-input">
          <input
            type="password"
            name="confirmPassword"
            value={passwords.confirmPassword}
            onChange={handlePasswordChange}
            placeholder="Confirmar Nova Senha"
          />
        </div>
        <div className="password-buttons">
          <button onClick={handlePasswordSave}>Confirmar</button>
        </div>
      </div>
      <div className="account-buttonsD">
        <button onClick={DeletarConta}>Deletar Contar</button>
      </div>
    </div>
  );
};

export default Account;
