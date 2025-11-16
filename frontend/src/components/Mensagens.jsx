import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import { mensagensService } from '../services/api';
import './Mensagens.scss';

/**
 * Componente Mensagens - Sistema de mensagens (Síndico)
 * 
 * Permite ao síndico enviar mensagens para moradores e visualizar
 * mensagens recebidas.
 */
const Mensagens = () => {
  const [user, setUser] = useState('Usuário');
  const [mensagens, setMensagens] = useState([]);
  const [recipient, setRecipient] = useState('all');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
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
    setUser(storedUser);
    
    // Carrega mensagens
    loadMensagens();
  }, [navigate]);

  // Carrega mensagens da API
  const loadMensagens = async () => {
    try {
      const data = await mensagensService.getAll();
      setMensagens(data);
    } catch (error) {
      console.error('Erro ao carregar mensagens:', error);
      // Mensagens de exemplo
      setMensagens([
        {
          id: 1,
          titulo: 'Reunião Extraordinária',
          remetente: 'Síndico',
          conteudo: 'Haverá uma reunião extraordinária amanhã às 19h.',
          data: new Date().toISOString()
        },
        {
          id: 2,
          titulo: 'Manutenção Programada',
          remetente: 'Administração',
          conteudo: 'A manutenção do elevador está programada para sexta-feira.',
          data: new Date().toISOString()
        }
      ]);
    }
  };

  // Envia uma nova mensagem
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!subject || !message) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    try {
      setLoading(true);
      await mensagensService.create({
        destinatario: recipient,
        assunto: subject,
        mensagem: message
      });
      
      alert('Mensagem enviada com sucesso!');
      setSubject('');
      setMessage('');
      setRecipient('all');
      
      // Recarrega as mensagens
      loadMensagens();
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      alert('Erro ao enviar mensagem. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mensagens-container">
      <Sidebar userRole="sindico" />
      <Header userName={user} />
      
      <div className="content">
        <h2>Mensagens e Comunicações</h2>
        <p>Envie e receba mensagens importantes para a comunidade.</p>
        
        <div className="messages-section">
          {/* Formulário para enviar mensagem */}
          <div className="compose-message">
            <h3>Enviar Mensagem</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="recipient">Destinatário:</label>
                <select
                  id="recipient"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                >
                  <option value="all">Todos os Moradores</option>
                  <option value="sindico">Síndico</option>
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="subject">Assunto:</label>
                <input
                  type="text"
                  id="subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Mensagem:</label>
                <textarea
                  id="message"
                  rows="5"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />
              </div>
              
              <button type="submit" className="btn-send" disabled={loading}>
                {loading ? 'Enviando...' : 'Enviar'}
              </button>
            </form>
          </div>
          
          {/* Lista de mensagens recebidas */}
          <div className="message-list">
            <h3>Mensagens Recebidas</h3>
            {mensagens.length > 0 ? (
              mensagens.map((msg) => (
                <div key={msg.id} className="message-item">
                  <h4>{msg.titulo}</h4>
                  <p className="sender">De: {msg.remetente}</p>
                  <p className="content">{msg.conteudo}</p>
                  <p className="date">
                    {new Date(msg.data).toLocaleDateString('pt-BR')}
                  </p>
                </div>
              ))
            ) : (
              <p>Nenhuma mensagem encontrada.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mensagens;

