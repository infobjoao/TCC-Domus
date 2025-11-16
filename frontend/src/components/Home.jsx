// Importa o React e hooks necessários
import React, { useState, useEffect } from 'react';
// Importa hooks de navegação do React Router
import { useNavigate, Link } from 'react-router-dom';
// Importa o componente Sidebar (barra lateral)
import Sidebar from './Sidebar';
// Importa o componente Header (cabeçalho)
import Header from './Header';
// Importa os estilos do componente
import './Home.scss';

/**
 * Componente Home - Dashboard principal do síndico
 *
 * Esta é a página inicial do sistema para usuários do tipo síndico.
 * Exibe um dashboard com cards de acesso rápido às principais funcionalidades.
 */
const Home = () => {
  // Estado para armazenar o nome do usuário logado
  const [user, setUser] = useState('Usuário');
  // Hook do React Router para navegação programática
  const navigate = useNavigate();

  // Efeito que verifica autenticação e carrega dados do usuário
  // Executa quando o componente é montado ou quando navigate muda
  useEffect(() => {
    // Busca o token de autenticação no localStorage
    const token = localStorage.getItem('token');
    // Se não houver token, redireciona para a página de login
    if (!token) {
      navigate('/login');
      return;
    }

    // Busca o nome do usuário do localStorage
    // Se não encontrar, usa 'Usuário logado' como padrão
    const storedUser = localStorage.getItem('usuario') || 'Usuário logado';
    // Atualiza o estado com o nome do usuário
    setUser(storedUser);
  }, [navigate]); // Dependência: executa quando navigate muda

  // Retorna o JSX do componente
  return (
    <div className="home-container">
      {/* Barra lateral de navegação - passa 'sindico' como userRole */}
      <Sidebar userRole="sindico" />

      {/* Cabeçalho com menu de perfil - passa o nome do usuário */}
      <Header userName={user} />

      {/* Conteúdo principal da página */}
      <div className="content">
        {/* Título de boas-vindas */}
        <h2>Bem-vindo ao Domus</h2>
        {/* Descrição do sistema */}
        <p>Gerencie seu condomínio de forma eficiente e conectada.</p>

        {/* Cards de acesso rápido às funcionalidades */}
        <div className="dashboard-section">
          {/* Card de Visão Geral */}
          <div className="dashboard-card">
            {/* Título do card */}
            <h3>Visão Geral</h3>
            {/* Descrição do card */}
            <p>Acesse rapidamente as principais funcionalidades do sistema.</p>
            {/* Link para a página de finanças */}
            <Link to="/financas" className="card-link">Ver Finanças</Link>
          </div>

          {/* Card de Mensagens */}
          <div className="dashboard-card">
            {/* Título do card */}
            <h3>Mensagens</h3>
            {/* Descrição do card */}
            <p>Envie e receba comunicações importantes.</p>
            {/* Link para a página de mensagens */}
            <Link to="/mensagens" className="card-link">Ver Mensagens</Link>
          </div>

          {/* Card de Chamados */}
          <div className="dashboard-card">
            {/* Título do card */}
            <h3>Chamados</h3>
            {/* Descrição do card */}
            <p>Gerencie solicitações de manutenção.</p>
            {/* Link para a página de chamados */}
            <Link to="/chamados" className="card-link">Ver Chamados</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

// Exporta o componente para ser usado em outros arquivos
export default Home;
