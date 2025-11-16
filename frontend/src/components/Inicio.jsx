
import React from 'react';
// Importa o Link do React Router para navegação
import { Link } from 'react-router-dom';
// Importa os estilos do componente
import './Inicio.scss';

/**
 
Componente Inicio - Página inicial pública do sistema
Esta é a primeira página que o usuário vê ao acessar o sistema.
Apresenta o sistema e oferece opções de login ou cadastro.
Não requer autenticação para ser visualizada.*/
const Inicio = () => {
  // Retorna o JSX do componente
  return (
    <>
      {/* Vídeo de fundo */}
      <video autoPlay muted loop className="background-video">
        <source src="/assets/video/DOMUS_1.mp4" type="video/mp4" />
        Seu navegador não suporta o elemento de vídeo.
      </video>

      {/* Conteúdo diretamente sobre o vídeo */}
      <div className="inicio-overlay">
        {/* Botões de ação para login e cadastro */}
        <div className="action-buttons">
          {/* Link para a página de login */}
          <Link to="/login" className="btn-primary">
            Entrar
          </Link>
          {/* Link para a página de cadastro */}
          <Link to="/cadastro" className="btn-secondary">
            Cadastrar-se
          </Link>
        </div>
      </div>
    </>
  );
};

// Exporta o componente para ser usado em outros arquivos
export default Inicio;