import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Cadastro.scss';

const Cadastro = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('As senhas não coincidem.');
      return;
    }
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password, role }),
      });
      const data = await response.json();
      if (response.ok) {
        navigate('/login');
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Cadastro error:', error);
      alert('Erro ao cadastrar');
    }
  };

  return (
    <div className="cadastro-container">
      <h1>Cadastro</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nome:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirm-password">Confirmar Senha:</label>
          <input
            type="password"
            id="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Tipo de Usuário:</label>
          <div className="radio-group">
            <input
              type="radio"
              id="sindico"
              name="role"
              value="sindico"
              checked={role === 'sindico'}
              onChange={(e) => setRole(e.target.value)}
              required
            />
            <label htmlFor="sindico">Síndico</label>
            <input
              type="radio"
              id="morador"
              name="role"
              value="morador"
              checked={role === 'morador'}
              onChange={(e) => setRole(e.target.value)}
              required
            />
            <label htmlFor="morador">Morador</label>
          </div>
        </div>
        <button type="submit" className="btn-cadastro">Cadastrar</button>
      </form>
      <p>Já tem conta? <a href="/login">Faça login aqui</a></p>
    </div>
  );
};

export default Cadastro;
