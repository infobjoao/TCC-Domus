import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.scss';

const Home = () => {
  const [user, setUser] = useState('');
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    // Decode token or fetch user info
    const storedUser = localStorage.getItem('usuario') || 'Usuário logado';
    setUser(storedUser);
  }, [navigate]);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('role');
    navigate('/');
  };

  return (
    <div className="home-container">
      <div className="barr">
        <h1>Domus</h1>
        <div className="bar-text">
          <div className="gif-org">
            <a href="/inicio"><img className="gif" src="/assets/image/botao-de-inicio.png" alt="Inicio" /><h3>Inicio</h3></a>
            <a href="/financas"><img className="gif" src="/assets/video/output-onlinegiftools.gif" alt="Finanças" /><h3>Finanças</h3></a>
            <a href="/mensagens"><img className="gif" src="/assets/video/output-onlinegiftools (1).gif" alt="Mensagens" /><h3>Mensagens</h3></a>
            <a href="/chamados"><img className="gif" src="/assets/video/output-onlinegiftools (6).gif" alt="Chamados" /><h3>Chamados</h3></a>
            <a href="/sobre"><img className="gif" src="/assets/video/output-onlinegiftools (4).gif" alt="Sobre" /><h3>Sobre</h3></a>
            <a href="https://instagram.com"><img className="contato" src="/assets/image/instagram.png" alt="Instagram" /></a>
          </div>
        </div>
      </div>
      <div className="cab">
        <div className="profile-container">
          <img className="user" id="profile-icon" src="/assets/image/user (1).png" alt="Perfil" onClick={toggleDropdown} />
          <div className={`dropdown-menu ${dropdownVisible ? 'show' : ''}`}>
            <div className="user-info">
              <p>{user}</p>
            </div>
            <a href="/settings">Configuração</a>
            <a href="/login">Trocar de conta</a>
            <a onClick={handleLogout}>Sair</a>
          </div>
        </div>
      </div>
      <div className="content">
        <h2>Bem-vindo ao Domus</h2>
        <p>Gerencie seu condomínio de forma eficiente e conectada.</p>
        <div className="dashboard-section">
          <div className="dashboard-card">
            <h3>Visão Geral</h3>
            <p>Acesse rapidamente as principais funcionalidades do sistema.</p>
            <a href="/financas" className="card-link">Ver Finanças</a>
          </div>
          <div className="dashboard-card">
            <h3>Mensagens</h3>
            <p>Envie e receba comunicações importantes.</p>
            <a href="/mensagens" className="card-link">Ver Mensagens</a>
          </div>
          <div className="dashboard-card">
            <h3>Chamados</h3>
            <p>Gerencie solicitações de manutenção.</p>
            <a href="/chamados" className="card-link">Ver Chamados</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
