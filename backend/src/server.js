/**
 * Servidor Principal do Back-end DOMUS
 * 
 * Este arquivo configura e inicia o servidor Express,
 * conectando todas as rotas e middlewares do sistema.
 */

const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// Importa configuração do banco
const { readDB } = require('./config/db');

// Importa as rotas
const authRoutes = require('./routes/authRoutes');
const financasRoutes = require('./routes/financasRoutes');
const mensagensRoutes = require('./routes/mensagensRoutes');
const chamadosRoutes = require('./routes/chamadosRoutes');

// Cria a aplicação Express
const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares globais
app.use(cors()); // Permite requisições de diferentes origens
app.use(express.json()); // Permite receber JSON no body das requisições
app.use(express.urlencoded({ extended: true })); // Permite receber dados de formulários

// Rotas da API
app.use('/api/auth', authRoutes); // Rotas de autenticação
app.use('/api/financas', financasRoutes); // Rotas de finanças
app.use('/api/mensagens', mensagensRoutes); // Rotas de mensagens
app.use('/api/chamados', chamadosRoutes); // Rotas de chamados

// Rota de teste para verificar se o servidor está funcionando
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Servidor DOMUS está funcionando!',
    timestamp: new Date().toISOString()
  });
});

// Inicia o servidor
app.listen(PORT, async () => {
  console.log(`🚀 Servidor DOMUS rodando na porta ${PORT}`);
  console.log(`📡 API disponível em http://localhost:${PORT}/api`);

  // Testa conexão com o banco
  try {
    readDB();
    console.log('✅ Banco de dados JSON carregado com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao carregar banco de dados:', error.message);
  }
});

module.exports = app;

