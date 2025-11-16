// Importa o React para criar componentes
import React from 'react';
// Importa componentes de roteamento do React Router
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Importa o componente de login
import Login from '../components/Login';
// Importa o componente de cadastro
import Cadastro from '../components/Cadastro';
// Importa o componente Home (dashboard do síndico)
import Home from '../components/Home';
// Importa o componente de finanças (síndico)
import Financas from '../components/Financas';
// Importa o componente de mensagens (síndico)
import Mensagens from '../components/Mensagens';
// Importa o componente de chamados (síndico)
import Chamados from '../components/Chamados';
// Importa o componente sobre
import Sobre from '../components/Sobre';
// Importa o componente de configurações
import Settings from '../components/Settings';
// Importa o componente HomeMorador (dashboard do morador)
import HomeMorador from '../components/HomeMorador';
// Importa o componente de finanças do morador
import FinancasMorador from '../components/FinancasMorador';
// Importa o componente de mensagens do morador
import MensagensMorador from '../components/MensagensMorador';
// Importa o componente de chamados do morador
import ChamadosMorador from '../components/ChamadosMorador';
// Importa o componente de início (página pública)
import Inicio from '../components/Inicio';

/**
 * AppRouter - Componente de roteamento principal
 * 
 * Define todas as rotas do sistema React,
 * incluindo rotas públicas e privadas.
 * Este componente é responsável por mapear URLs para componentes.
 */

// Componente funcional que retorna o roteador
const AppRouter = () => {
  // Retorna o JSX com todas as rotas definidas
  return (
    // Router do React Router que gerencia o histórico de navegação
    <Router>
      {/* Container de rotas */}
      <Routes>
        {/* Rota para a página inicial pública */}
        <Route path="/" element={<Inicio />} />
        {/* Rota para a página de login */}
        <Route path="/login" element={<Login />} />
        {/* Rota para a página de cadastro */}
        <Route path="/cadastro" element={<Cadastro />} />
        {/* Rota para o dashboard do síndico */}
        <Route path="/home" element={<Home />} />
        {/* Rota para o dashboard do morador */}
        <Route path="/home-morador" element={<HomeMorador />} />
        {/* Rota para finanças do síndico */}
        <Route path="/financas" element={<Financas />} />
        {/* Rota para finanças do morador */}
        <Route path="/financas-morador" element={<FinancasMorador />} />
        {/* Rota para mensagens do síndico */}
        <Route path="/mensagens" element={<Mensagens />} />
        {/* Rota para mensagens do morador */}
        <Route path="/mensagens-morador" element={<MensagensMorador />} />
        {/* Rota para chamados do síndico */}
        <Route path="/chamados" element={<Chamados />} />
        {/* Rota para chamados do morador */}
        <Route path="/chamados-morador" element={<ChamadosMorador />} />
        {/* Rota para a página sobre */}
        <Route path="/sobre" element={<Sobre />} />
        {/* Rota para configurações */}
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
  );
};

// Exporta o componente para ser usado em outros arquivos
export default AppRouter;
