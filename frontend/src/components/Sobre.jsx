import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import './Sobre.scss';

/**
 * Componente Sobre - Página sobre o sistema
 * 
 * Exibe informações sobre o sistema Domus, incluindo missão,
 * funcionalidades e informações de contato.
 */
const Sobre = () => {
  const [user, setUser] = useState('Usuário');
  const navigate = useNavigate();

  // Verifica autenticação
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    
    const storedUser = localStorage.getItem('usuario') || 'Usuário';
    setUser(storedUser);
  }, [navigate]);

  return (
    <div className="sobre-container">
      <Sidebar userRole={localStorage.getItem('role') || 'sindico'} />
      <Header userName={user} />
      
      <div className="content">
        <h2>Sobre o Domus</h2>
        <p>Conheça mais sobre nossa plataforma de gestão de condomínios.</p>
        
        <div className="about-section">
          {/* Card de missão */}
          <div className="about-card">
            <h3>Nossa Missão</h3>
            <p>
              Simplificar a administração de condomínios, conectando síndicos 
              e moradores de forma eficiente e transparente.
            </p>
          </div>
          
          {/* Card de funcionalidades */}
          <div className="about-card">
            <h3>Funcionalidades</h3>
            <ul>
              <li>💰 Gestão financeira completa</li>
              <li>💬 Comunicação integrada</li>
              <li>🔧 Sistema de chamados de manutenção</li>
              <li>📊 Dashboard com visão geral</li>
              <li>👥 Gestão de usuários e permissões</li>
            </ul>
          </div>
          
          {/* Card de contato */}
          <div className="about-card">
            <h3>Contato</h3>
            <p>📧 Email: contato@domus.com</p>
            <p>📞 Telefone: (11) 9999-9999</p>
            <p>📱 Instagram: @domus_condominios</p>
          </div>
        </div>
        
        {/* Informações técnicas */}
        <div className="tech-info">
          <h3>Informações Técnicas</h3>
          <p>
            Sistema desenvolvido para fins de facilitar o gerenciamento de condominios
            feito por:
            joão victor G
            Gabriel ceni
            matheus
          </p>
          <p>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sobre;

