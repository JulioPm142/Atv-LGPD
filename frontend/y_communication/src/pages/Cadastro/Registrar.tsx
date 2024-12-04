import React, { useState } from 'react';
import './Registrar.css';

const Register: React.FC = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (user.password === user.confirmPassword) {
      console.log('Registrando usuário:', user);
    } else {
      alert('As senhas não coincidem!');
    }
  };

  return (
    <div className="register-container">
      <h2>Cadastrar</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nome:</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            value={user.name} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            value={user.email} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Telefone:</label>
          <input 
            type="tel" 
            id="phone" 
            name="phone" 
            value={user.phone} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Endereço:</label>
          <input 
            type="text" 
            id="address" 
            name="address" 
            value={user.address} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Senha:</label>
          <input 
            type="password" 
            id="password" 
            name="password" 
            value={user.password} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirmar Senha:</label>
          <input 
            type="password" 
            id="confirmPassword" 
            name="confirmPassword" 
            value={user.confirmPassword} 
            onChange={handleChange} 
            required 
          />
        </div>
        <button type="submit" className="register-button">Registrar</button>
      </form>
    </div>
  );
};

export default Register;
