import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import './Settings.scss';

/**
 * Componente Settings - Página de configurações
 * 
 * Permite ao usuário alterar suas configurações pessoais
 * e preferências do sistema.
 */
const Settings = () => {
  const [user, setUser] = useState('Usuário');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Verifica autenticação e carrega dados
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    
    const storedUser = localStorage.getItem('usuario') || 'Usuário';
    const storedEmail = localStorage.getItem('email') || '';
    
    setUser(storedUser);
    setName(storedUser);
    setEmail(storedEmail);
  }, [navigate]);

  // Salva as configurações
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      // Aqui você faria uma chamada à API para salvar as configurações
      // Por enquanto, apenas atualiza o localStorage
      localStorage.setItem('usuario', name);
      localStorage.setItem('email', email);
      
      alert('Configurações salvas com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar configurações:', error);
      alert('Erro ao salvar configurações.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="settings-container">
      <Sidebar userRole={localStorage.getItem('role') || 'sindico'} />
      <Header userName={user} />
      
      <div className="content">
        <h2>Configurações</h2>
        <p>Gerencie suas preferências e informações pessoais.</p>
        
        <div className="settings-section">
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
            
            <button type="submit" className="btn-save" disabled={loading}>
              {loading ? 'Salvando...' : 'Salvar Alterações'}
            </button>
          </form>
          
          {/* Seção de informações da conta */}
          <div className="account-info">
            <h3>Informações da Conta</h3>
            <p><strong>Tipo de Usuário:</strong> {localStorage.getItem('role') === 'sindico' ? 'Síndico' : 'Morador'}</p>
            <p><strong>Último Acesso:</strong> {new Date().toLocaleString('pt-BR')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;

