/**
 * Serviço de API - Centraliza todas as chamadas à API
 *
 * Este arquivo contém funções para fazer requisições HTTP
 * para o back-end do sistema. Utiliza axios para as requisições.
 * Também configura interceptors para adicionar tokens e tratar erros.
 */

// Importa o axios para fazer requisições HTTP
import axios from 'axios';

// Configuração base do axios
// Cria uma instância do axios com configurações padrão
const api = axios.create({
  // URL base para todas as requisições (será redirecionada pelo proxy)
  baseURL: '/api',
  // Headers padrão para todas as requisições
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor para adicionar token de autenticação em todas as requisições
// Este interceptor é executado antes de cada requisição ser enviada
api.interceptors.request.use(
  // Função executada quando a requisição é feita
  (config) => {
    // Busca o token de autenticação no localStorage
    const token = localStorage.getItem('token');
    // Se o token existir, adiciona no header Authorization
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // Retorna a configuração modificada
    return config;
  },
  // Função executada em caso de erro na requisição
  (error) => {
    // Rejeita a promise com o erro
    return Promise.reject(error);
  }
);

// Interceptor para tratar erros de resposta
// Este interceptor é executado após receber a resposta do servidor
api.interceptors.response.use(
  // Função executada quando a resposta é bem-sucedida
  (response) => {
    // Retorna apenas os dados da resposta (response.data)
    return response.data;
  },
  // Função executada quando há erro na resposta
  (error) => {
    // Verifica se o erro é de autenticação (401 - Unauthorized)
    if (error.response && error.response.status === 401) {
      // Token inválido, remove dados do localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('usuario');
      localStorage.removeItem('role');
      // Redireciona para a página de login
      window.location.href = '/login';
    }
    // Retorna o erro completo para tratamento nos componentes
    return Promise.reject(error);
  }
);

/**
 * Serviço de Finanças
 * Gerencia todas as operações relacionadas a finanças
 * Cada método faz uma requisição HTTP diferente para o backend
 */
export const financasService = {
  // Busca todas as finanças (para síndico)
  getAll: () => api.get('/financas'),

  // Busca finanças do morador logado
  getMorador: () => api.get('/financas/morador'),

  // Busca moradores cadastrados (para síndico)
  getMoradores: () => api.get('/financas/moradores'),

  // Aplica valor às finanças de um morador (para síndico)
  aplicarValor: (data) => api.post('/financas/aplicar-valor', data),

  // Cria uma nova transação financeira
  create: (data) => api.post('/financas', data),

  // Atualiza uma transação financeira existente
  update: (id, data) => api.put(`/financas/${id}`, data),

  // Deleta uma transação financeira
  delete: (id) => api.delete(`/financas/${id}`)
};

/**
 * Serviço de Mensagens
 * Gerencia todas as operações relacionadas a mensagens
 * Cada método faz uma requisição HTTP diferente para o backend
 */
export const mensagensService = {
  // Busca todas as mensagens (para síndico)
  getAll: () => api.get('/mensagens'),

  // Busca mensagens do morador logado
  getMorador: () => api.get('/mensagens/morador'),

  // Cria uma nova mensagem
  create: (data) => api.post('/mensagens', data),

  // Deleta uma mensagem
  delete: (id) => api.delete(`/mensagens/${id}`)
};

/**
 * Serviço de Chamados
 * Gerencia todas as operações relacionadas a chamados
 * Cada método faz uma requisição HTTP diferente para o backend
 */
export const chamadosService = {
  // Busca todos os chamados (para síndico)
  getAll: () => api.get('/chamados'),

  // Busca chamados do morador logado
  getMorador: () => api.get('/chamados/morador'),

  // Cria um novo chamado
  create: (data) => api.post('/chamados', data),

  // Resolve um chamado (marca como resolvido)
  resolve: (id) => api.put(`/chamados/${id}/resolve`),

  // Deleta um chamado
  delete: (id) => api.delete(`/chamados/${id}`)
};

/**
 * Serviço de Autenticação
 * Gerencia operações de login e registro
 * Cada método faz uma requisição HTTP diferente para o backend
 */
export const authService = {
  // Faz login no sistema com email e senha
  login: (email, password) => api.post('/auth/login', { email, password }),

  // Registra um novo usuário no sistema
  register: (data) => api.post('/auth/register', data)
};

// Exporta a instância do axios configurada como padrão
export default api;
