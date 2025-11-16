// Importa o React para criar componentes
import React from 'react';
// Importa o ReactDOM para renderizar componentes no DOM
import ReactDOM from 'react-dom/client';
// Importa o componente de roteamento principal
import AppRouter from './routes/AppRouter';
// Importa os estilos globais do sistema
import './styles/global.scss';

// Cria a raiz do React no elemento com id 'root' do HTML
const root = ReactDOM.createRoot(document.getElementById('root'));

// Renderiza o AppRouter dentro do React.StrictMode
// StrictMode ajuda a identificar problemas potenciais durante o desenvolvimento
root.render(
  <React.StrictMode>
    {/* Componente principal de roteamento que gerencia todas as rotas */}
    <AppRouter />
  </React.StrictMode>
);
