// Importa o React e hooks necessários
import React, { useState, useEffect } from 'react';
// Importa o hook useNavigate para navegação programática
import { useNavigate } from 'react-router-dom';
// Importa ícones do react-icons
import { FaCog, FaUser } from 'react-icons/fa';
// Importa os estilos do componente
import './Header.scss';

/**
 * Componente Header - Cabeçalho do sistema
 *
 * Este componente exibe o cabeçalho com o menu de perfil do usuário.
 * Permite acesso às configurações, trocar de conta e fazer logout.
 *
 * @param {string} userName - Nome do usuário logado
 */
const Header = ({ userName = 'Usuário' }) => {
  // Estado para controlar a visibilidade do dropdown do perfil
  const [dropdownVisible, setDropdownVisible] = useState(false);
  // Hook do React Router para navegação
  const navigate = useNavigate();

  // Efeito que fecha o dropdown quando clica fora dele
  useEffect(() => {
    // Função que verifica se o clique foi fora do container do perfil
    const handleClickOutside = (event) => {
      // Se o clique não foi dentro do container do perfil, fecha o dropdown
      if (!event.target.closest('.profile-container')) {
        setDropdownVisible(false);
      }
    };

    // Adiciona o listener de clique no documento
    document.addEventListener('click', handleClickOutside);
    // Remove o listener quando o componente é desmontado (cleanup)
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // Função que alterna a visibilidade do dropdown
  const toggleDropdown = () => {
    // Inverte o estado atual do dropdown
    setDropdownVisible(!dropdownVisible);
  };

  // Função que navega para as configurações
  const handleSettings = (e) => {
    // Previne o comportamento padrão do link
    e.preventDefault();
    // Navega para a página de configurações
    navigate('/settings');
    // Fecha o dropdown após navegar
    setDropdownVisible(false);
  };

  // Função que navega para o login (trocar de conta)
  const handleSwitchAccount = (e) => {
    // Previne o comportamento padrão do link
    e.preventDefault();
    // Navega para a página de login
    navigate('/login');
    // Fecha o dropdown após navegar
    setDropdownVisible(false);
  };

  // Função que faz logout do sistema
  const handleLogout = (e) => {
    // Previne o comportamento padrão do link
    e.preventDefault();
    // Remove o token de autenticação do localStorage
    localStorage.removeItem('token');
    // Remove o nome do usuário do localStorage
    localStorage.removeItem('usuario');
    // Remove o papel do usuário do localStorage
    localStorage.removeItem('role');
    // Navega para a página inicial
    navigate('/');
    // Fecha o dropdown após fazer logout
    setDropdownVisible(false);
  };

  // Retorna o JSX do componente
  return (
    <div className="header">
      {/* Botão de configurações */}
      <a href="/settings" onClick={handleSettings} className="settings-link">
        {/* Ícone de configurações */}
        <FaCog className="settings-icon" />
      </a>

      {/* Container do perfil do usuário */}
      <div className="profile-container">
        {/* Ícone do usuário que ao clicar abre o dropdown */}
        <FaUser
          className="user-icon"
          onClick={toggleDropdown}
        />

        {/* Menu dropdown do perfil - só aparece quando dropdownVisible é true */}
        <div className={`dropdown-menu ${dropdownVisible ? 'show' : ''}`}>
          {/* Área de informações do usuário no topo do menu */}
          <div className="user-info">
            {/* Exibe o nome do usuário */}
            <p>{userName}</p>
          </div>
          {/* Link para configurações */}
          <a href="/settings" onClick={handleSettings}>
            Configuração
          </a>
          {/* Link para trocar de conta */}
          <a href="/login" onClick={handleSwitchAccount}>
            Trocar de conta
          </a>
          {/* Link para fazer logout */}
          <a href="#" onClick={handleLogout}>
            Sair
          </a>
        </div>
      </div>
    </div>
  );
};

// Exporta o componente para ser usado em outros arquivos
export default Header;
