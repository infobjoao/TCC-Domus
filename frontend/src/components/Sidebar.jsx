// Importa o React para criar componentes
import React from 'react';
// Importa o Link para navegação e useLocation para detectar a rota atual
import { Link, useLocation } from 'react-router-dom';
// Importa ícones do react-icons para usar no lugar de imagens
import { FaHome, FaDollarSign, FaEnvelope, FaWrench, FaInfoCircle, FaInstagram } from 'react-icons/fa';
// Importa os estilos do componente
import './Sidebar.scss';

/**
 * Componente Sidebar - Barra lateral de navegação
 * 
 * Este componente exibe a barra lateral com os links de navegação
 * do sistema. Ele mostra diferentes links dependendo do tipo de usuário
 * (síndico ou morador).
 * 
 * @param {string} userRole - Tipo de usuário ('sindico' ou 'morador')
 */
const Sidebar = ({ userRole = 'sindico' }) => {
  // Hook do React Router para obter a rota atual
  const location = useLocation();

  // Define os links baseado no tipo de usuário
  // Se for morador, mostra rotas específicas para morador
  // Se for síndico, mostra rotas específicas para síndico
  const links = userRole === 'morador' 
    ? [
        // Link para a página inicial do morador com ícone de casa
        { path: '/home-morador', label: 'Inicio', icon: FaHome },
        // Link para finanças do morador com ícone de dinheiro
        { path: '/financas-morador', label: 'Finanças', icon: FaDollarSign },
        // Link para mensagens do morador com ícone de envelope
        { path: '/mensagens-morador', label: 'Mensagens', icon: FaEnvelope },
        // Link para chamados do morador com ícone de chave inglesa
        { path: '/chamados-morador', label: 'Chamados', icon: FaWrench },
        // Link para página sobre com ícone de informação
        { path: '/sobre', label: 'Sobre', icon: FaInfoCircle }
      ]
    : [
        // Link para a página inicial do síndico com ícone de casa
        { path: '/home', label: 'Inicio', icon: FaHome },
        // Link para finanças do síndico com ícone de dinheiro
        { path: '/financas', label: 'Finanças', icon: FaDollarSign },
        // Link para mensagens do síndico com ícone de envelope
        { path: '/mensagens', label: 'Mensagens', icon: FaEnvelope },
        // Link para chamados do síndico com ícone de chave inglesa
        { path: '/chamados', label: 'Chamados', icon: FaWrench },
        // Link para página sobre com ícone de informação
        { path: '/sobre', label: 'Sobre', icon: FaInfoCircle }
      ];

  // Retorna o JSX do componente
  return (
    <div className="sidebar">
      {/* Logo do sistema - título Domus */}
      <h1>Domus</h1>
      
      {/* Container dos links de navegação */}
      <div className="sidebar-links">
        <div className="gif-org">
          {/* Mapeia cada link e cria um componente Link do React Router */}
          {links.map((link) => {
            // Componente do ícone dinâmico baseado no link
            const IconComponent = link.icon;
            return (
              <Link 
                key={link.path}
                to={link.path}
                // Adiciona classe 'active' se a rota atual corresponder ao link
                className={location.pathname === link.path ? 'active' : ''}
              >
                {/* Renderiza o ícone do react-icons */}
                <IconComponent className="icon" />
                {/* Texto do link */}
                <h3>{link.label}</h3>
              </Link>
            );
          })}
          
          {/* Link para Instagram - abre em nova aba */}
          <a 
            href="https://instagram.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="contato-link"
          >
            {/* Ícone do Instagram */}
            <FaInstagram className="contato-icon" />
          </a>
        </div>
      </div>
    </div>
  );
};

// Exporta o componente para ser usado em outros arquivos
export default Sidebar;
