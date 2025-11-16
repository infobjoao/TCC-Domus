import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import './Home.scss';

/**
 * Componente HomeMorador - Dashboard principal do morador
 * 
 * Esta é a página inicial do sistema para usuários do tipo morador.
 * Exibe um dashboard com informações relevantes para moradores.
 */
const HomeMorador = () => {
  const [user, setUser] = useState('Usuário');
  const navigate = useNavigate();

  // Verifica autenticação e carrega dados do usuário
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    
    // Busca o nome do usuário do localStorage
    const storedUser = localStorage.getItem('usuario') || 'Usuário logado';
    setUser(storedUser);
  }, [navigate]);

  return (
    <div className="home-container">
      {/* Barra lateral de navegação */}
      <Sidebar userRole="morador" />
      
      {/* Cabeçalho com menu de perfil */}
      <Header userName={user} />
      
      {/* Conteúdo principal da página */}
      <div className="content">
        <h2>Bem-vindo ao Domus</h2>
        <p>Gerencie sua vida no condomínio de forma simples e eficiente.</p>
        
        {/* Cards de acesso rápido */}
        <div className="dashboard-section">
          <div className="dashboard-card">
            <h3>Minhas Finanças</h3>
            <p>Visualize suas taxas de condomínio e pagamentos.</p>
            <Link to="/financas-morador" className="card-link">Ver Finanças</Link>
          </div>
          
          <div className="dashboard-card">
            <h3>Mensagens</h3>
            <p>Receba comunicações importantes do síndico.</p>
            <Link to="/mensagens-morador" className="card-link">Ver Mensagens</Link>
          </div>
          
          <div className="dashboard-card">
            <h3>Chamados</h3>
            <p>Abra solicitações de manutenção.</p>
            <Link to="/chamados-morador" className="card-link">Ver Chamados</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeMorador;

