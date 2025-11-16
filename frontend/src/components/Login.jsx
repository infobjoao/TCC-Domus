// Importa o React e o hook useState para gerenciar estado
import React, { useState } from 'react';
// Importa o hook useNavigate para navegação programática
import { useNavigate, Link } from 'react-router-dom';
// Importa o serviço de autenticação
import { authService } from '../services/api';
// Importa ícones do react-icons
import { FaLock, FaUser, FaEye, FaEyeSlash } from 'react-icons/fa';
// Importa a logo do projeto
import logo from '../assets/logo.svg';
// Importa os estilos do componente
import './Login.scss';

/**
 * Componente Login - Página de autenticação
 * 
 * Permite ao usuário fazer login no sistema usando
 * email/usuário e senha. Inclui validação de campos
 * e feedback visual durante o processo.
 */
const Login = () => {
  // Estado para armazenar o email/usuário digitado
  const [email, setEmail] = useState('');
  // Estado para armazenar a senha digitada
  const [password, setPassword] = useState('');
  // Estado para controlar se está carregando (fazendo requisição)
  const [loading, setLoading] = useState(false);
  // Estado para controlar a visibilidade da senha
  const [showPassword, setShowPassword] = useState(false);
  // Hook do React Router para navegação
  const navigate = useNavigate();

  // Função que processa o login do usuário
  const handleSubmit = async (e) => {
    // Previne o comportamento padrão do formulário (recarregar página)
    e.preventDefault();
    
    // Valida se os campos foram preenchidos
    if (!email || !password) {
      // Mostra alerta se algum campo estiver vazio
      alert('Por favor, preencha todos os campos.');
      return;
    }

    try {
      // Define loading como true para mostrar feedback visual
      setLoading(true);
      // Faz a requisição de login para o backend
      const data = await authService.login(email, password);
      
      // Salva o token de autenticação no localStorage
      localStorage.setItem('token', data.token);
      // Salva o papel do usuário (síndico ou morador) no localStorage
      localStorage.setItem('role', data.role);
      // Salva o nome do usuário ou email no localStorage
      localStorage.setItem('usuario', data.name || email);
      // Salva o email no localStorage
      localStorage.setItem('email', email);
      
      // Redireciona baseado no tipo de usuário
      // Se for morador, vai para /home-morador, senão vai para /home
      navigate(data.role === 'morador' ? '/home-morador' : '/home');
    } catch (error) {
      // Log do erro no console para debug
      console.error('Login error:', error);
      // Tenta obter a mensagem de erro da resposta da API
      const errorMessage = error.response && error.response.data 
        ? error.response.data.message 
        : 'Erro ao fazer login. Verifique suas credenciais.';
      // Mostra alerta com a mensagem de erro
      alert(errorMessage);
    } finally {
      // Sempre define loading como false ao finalizar (sucesso ou erro)
      setLoading(false);
    }
  };

  // Função que alterna a visibilidade da senha
  const togglePasswordVisibility = () => {
    // Inverte o estado atual de showPassword
    setShowPassword(!showPassword);
  };

  // Retorna o JSX do componente
  return (
    <div className="login-container">
      {/* Container da logo */}
      <div className="logo-container">
        {/* Imagem da logo do Domus */}
        <img src={logo} alt="Domus Logo" className="logo" />
      </div>
      
      {/* Título da página */}
      <h1>Bem-vindo ao Domus</h1>
      {/* Subtítulo explicativo */}
      <p className="subtitle">Faça login para acessar o sistema</p>
      
      {/* Formulário de login */}
      <form onSubmit={handleSubmit}>
        {/* Grupo do campo de email/usuário */}
        <div className="form-group">
          {/* Label do campo */}
          <label htmlFor="email">
            {/* Ícone de usuário ao lado do label */}
            <FaUser className="input-icon" />
            Email ou Usuário:
          </label>
          {/* Input de texto para email/usuário */}
          <input
            type="text"
            id="email"
            value={email}
            // Atualiza o estado email quando o valor muda
            onChange={(e) => setEmail(e.target.value)}
            // Campo obrigatório
            required
            // Placeholder para ajudar o usuário
            placeholder="Digite seu email ou usuário"
          />
        </div>
        
        {/* Grupo do campo de senha */}
        <div className="form-group">
          {/* Label do campo */}
          <label htmlFor="password">
            {/* Ícone de cadeado ao lado do label */}
            <FaLock className="input-icon" />
            Senha:
          </label>
          {/* Container do input de senha com botão de mostrar/ocultar */}
          <div className="password-input-container">
            {/* Input de senha - muda o tipo baseado em showPassword */}
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={password}
              // Atualiza o estado password quando o valor muda
              onChange={(e) => setPassword(e.target.value)}
              // Campo obrigatório
              required
              // Placeholder para ajudar o usuário
              placeholder="Digite sua senha"
            />
            {/* Botão para mostrar/ocultar senha */}
            <button
              type="button"
              className="password-toggle"
              // Chama a função que alterna a visibilidade
              onClick={togglePasswordVisibility}
            >
              {/* Mostra ícone de olho aberto ou fechado baseado no estado */}
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>
        
        {/* Botão de submit do formulário */}
        <button type="submit" className="btn-login" disabled={loading}>
          {/* Mostra texto diferente se estiver carregando */}
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
      </form>
      
      {/* Link para página de cadastro */}
      <p className="register-link">
        Não tem conta? <Link to="/cadastro">Cadastre-se aqui</Link>
      </p>
    </div>
  );
};

// Exporta o componente para ser usado em outros arquivos
export default Login;
