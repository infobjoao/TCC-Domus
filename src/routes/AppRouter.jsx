import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../components/Login';
import Cadastro from '../components/Cadastro';
import Home from '../components/Home';
import Financas from '../components/Financas';
import Mensagens from '../components/Mensagens';
import Chamados from '../components/Chamados';
import Sobre from '../components/Sobre';
import Settings from '../components/Settings';
import HomeMorador from '../components/HomeMorador';
import FinancasMorador from '../components/FinancasMorador';
import MensagensMorador from '../components/MensagensMorador';
import ChamadosMorador from '../components/ChamadosMorador';
import Inicio from '../components/Inicio';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/home" element={<Home />} />
        <Route path="/home-morador" element={<HomeMorador />} />
        <Route path="/financas" element={<Financas />} />
        <Route path="/financas-morador" element={<FinancasMorador />} />
        <Route path="/mensagens" element={<Mensagens />} />
        <Route path="/mensagens-morador" element={<MensagensMorador />} />
        <Route path="/chamados" element={<Chamados />} />
        <Route path="/chamados-morador" element={<ChamadosMorador />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
