import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Conta from './pages/Conta/Conta'
import Login from './pages/Login/Login';
import Registrar from './pages/Cadastro/Registrar';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Conta" element={<Conta />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Registrar" element={<Registrar />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
