// Importa o React e o hook useState para gerenciar estado
import React, { useState } from 'react';
// Importa o hook useNavigate para navegação programática
import { useNavigate } from 'react-router-dom';
// Importa o serviço de autenticação
import { authService } from '../services/api';
// Importa os estilos do componente
import './Cadastro.scss';

const Cadastro = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !role) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    if (password !== confirmPassword) {
      alert('As senhas não coincidem.');
      return;
    }

    if (password.length < 6) {
      alert('A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    try {
      setLoading(true);
      await authService.register({ name, email, password, role });
      alert('Cadastro realizado com sucesso! Faça login para continuar.');
      navigate('/login');
    } catch (error) {
      console.error('Cadastro error:', error);
      const errorMessage = error.response && error.response.data
        ? error.response.data.message
        : 'Erro ao cadastrar. Tente novamente.';
      // Mostra alerta com a mensagem de erro
      alert(errorMessage);
    } finally {
      // Sempre define loading como false ao finalizar (sucesso ou erro)
      setLoading(false);
    }
  };

  // Retorna o JSX do componente
  return (
    <div className="cadastro-container">
      {/* Título da página */}
      <h1>Cadastro</h1>
      {/* Formulário de cadastro */}
      <form onSubmit={handleSubmit}>
        {/* Grupo do campo de nome */}
        <div className="form-group">
          {/* Label do campo */}
          <label htmlFor="name">Nome:</label>
          {/* Input de texto para o nome */}
          <input
            type="text"
            id="name"
            value={name}
            // Atualiza o estado name quando o valor muda
            onChange={(e) => setName(e.target.value)}
            // Campo obrigatório
            required
          />
        </div>
        {/* Grupo do campo de email */}
        <div className="form-group">
          {/* Label do campo */}
          <label htmlFor="email">Email:</label>
          {/* Input de email */}
          <input
            type="email"
            id="email"
            value={email}
            // Atualiza o estado email quando o valor muda
            onChange={(e) => setEmail(e.target.value)}
            // Campo obrigatório
            required
          />
        </div>
        {/* Grupo do campo de senha */}
        <div className="form-group">
          {/* Label do campo */}
          <label htmlFor="password">Senha:</label>
          {/* Input de senha */}
          <input
            type="password"
            id="password"
            value={password}
            // Atualiza o estado password quando o valor muda
            onChange={(e) => setPassword(e.target.value)}
            // Campo obrigatório
            required
          />
        </div>
        {/* Grupo do campo de confirmação de senha */}
        <div className="form-group">
          {/* Label do campo */}
          <label htmlFor="confirm-password">Confirmar Senha:</label>
          {/* Input de confirmação de senha */}
          <input
            type="password"
            id="confirm-password"
            value={confirmPassword}
            // Atualiza o estado confirmPassword quando o valor muda
            onChange={(e) => setConfirmPassword(e.target.value)}
            // Campo obrigatório
            required
          />
        </div>
        {/* Grupo do campo de tipo de usuário */}
        <div className="form-group">
          {/* Label do campo */}
          <label>Tipo de Usuário:</label>
          {/* Container dos radio buttons */}
          <div className="radio-group">
            {/* Radio button para síndico */}
            <input
              type="radio"
              id="sindico"
              name="role"
              value="sindico"
              // Marca como selecionado se role for 'sindico'
              checked={role === 'sindico'}
              // Atualiza o estado role quando selecionado
              onChange={(e) => setRole(e.target.value)}
              // Campo obrigatório
              required
            />
            {/* Label do radio button síndico */}
            <label htmlFor="sindico">Síndico</label>
            {/* Radio button para morador */}
            <input
              type="radio"
              id="morador"
              name="role"
              value="morador"
              // Marca como selecionado se role for 'morador'
              checked={role === 'morador'}
              // Atualiza o estado role quando selecionado
              onChange={(e) => setRole(e.target.value)}
              // Campo obrigatório
              required
            />
            {/* Label do radio button morador */}
            <label htmlFor="morador">Morador</label>
          </div>
        </div>
        {/* Botão de submit do formulário */}
        <button type="submit" className="btn-cadastro" disabled={loading}>
          {/* Mostra texto diferente se estiver carregando */}
          {loading ? 'Cadastrando...' : 'Cadastrar'}
        </button>
      </form>
      {/* Link para página de login */}
      <p>Já tem conta? <a href="/login">Faça login aqui</a></p>
    </div>
  );
};

// Exporta o componente para ser usado em outros arquivos
export default Cadastro;
