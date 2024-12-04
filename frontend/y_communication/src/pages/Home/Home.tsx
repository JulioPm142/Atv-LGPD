import React from 'react';
import './Home.css';

const usuario={
  Nome:'Nome-Usuario',
  Token:''
}

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <div className="content">
        {/* Feed de Posts */}
        <div className="feed">
          <h2>Feed</h2>
          <div className="post">
            <h3>Jane Doe</h3>
            <p>Adorei este dia incrível! 🌞</p>
          </div>
          <div className="post">
            <h3>John Smith</h3>
            <p>Alguém assistiu ao último episódio de "Série X"? 😱</p>
          </div>
          <div className="post">
            <h3>Maria Clara</h3>
            <p>Finalmente terminei meu projeto! 🎉</p>
          </div>
        </div>

        {/* Barra Lateral */}
        <aside className="sidebar">
          <h2>Amigos Sugeridos</h2>
          <ul>
            <li>Ana Silva</li>
            <li>Lucas Oliveira</li>
            <li>Carla Santos</li>
          </ul>

          <h2>Tendências</h2>
          <ul>
            <li>#DiaIncrível</li>
            <li>#SérieX</li>
            <li>#ProjetoFinalizado</li>
          </ul>
        </aside>
      </div>
    </div>
  );
};

export default Home;
