import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import { chamadosService } from '../services/api';
import './Chamados.scss';

/**
 * Componente Chamados - Sistema de chamados de manutenção (Síndico)
 *
 * Permite ao síndico visualizar e gerenciar chamados de manutenção
 * abertos pelos moradores.
 */
const Chamados = () => {
  const [user, setUser] = useState('Usuário');
  const [chamados, setChamados] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [prioridade, setPrioridade] = useState('media');
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

    // Carrega chamados
    loadChamados();
  }, [navigate]);

  // Carrega chamados da API
  const loadChamados = async () => {
    try {
      const data = await chamadosService.getAll();
      setChamados(data);
    } catch (error) {
      console.error('Erro ao carregar chamados:', error);
      // Chamados de exemplo
      setChamados([
        {
          id: 1,
          titulo: 'Problema no Elevador',
          descricao: 'Elevador parou no 5º andar.',
          prioridade: 'alta',
          status: 'em_andamento',
          data: new Date().toISOString()
        },
        {
          id: 2,
          titulo: 'Vazamento na Cozinha',
          descricao: 'Vazamento na torneira da cozinha coletiva.',
          prioridade: 'media',
          status: 'pendente',
          data: new Date().toISOString()
        }
      ]);
    }
  };

  // Cria um novo chamado
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!titulo || !descricao) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    try {
      setLoading(true);
      await chamadosService.create({
        titulo,
        descricao,
        prioridade
      });

      alert('Chamado aberto com sucesso!');
      setTitulo('');
      setDescricao('');
      setPrioridade('media');

      // Recarrega os chamados
      loadChamados();
    } catch (error) {
      console.error('Erro ao criar chamado:', error);
      alert('Erro ao criar chamado. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  // Resolve um chamado
  const handleResolve = async (id) => {
    try {
      await chamadosService.resolve(id);
      alert('Chamado resolvido com sucesso!');
      loadChamados();
    } catch (error) {
      console.error('Erro ao resolver chamado:', error);
      alert('Erro ao resolver chamado.');
    }
  };

  // Retorna a cor da prioridade
  const getPrioridadeColor = (prioridade) => {
    switch (prioridade) {
      case 'alta':
        return 'red';
      case 'media':
        return 'orange';
      case 'baixa':
        return 'green';
      default:
        return 'gray';
    }
  };

  // Retorna o texto do status
  const getStatusText = (status) => {
    switch (status) {
      case 'pendente':
        return 'Pendente';
      case 'em_andamento':
        return 'Em Andamento';
      case 'resolvido':
        return 'Resolvido';
      default:
        return status;
    }
  };

  return (
    <div className="chamados-container">
      <Sidebar userRole="sindico" />
      <Header userName={user} />

      <div className="content">
        <h2>Chamados de Manutenção</h2>
        <p>Acompanhe e gerencie solicitações de manutenção.</p>

        <div className="chamados-section">
          {/* Formulário para criar novo chamado */}
          <div className="new-chamado">
            <h3>Abrir Novo Chamado</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="titulo">Título:</label>
                <input
                  type="text"
                  id="titulo"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="descricao">Descrição:</label>
                <textarea
                  id="descricao"
                  rows="5"
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="prioridade">Prioridade:</label>
                <select
                  id="prioridade"
                  value={prioridade}
                  onChange={(e) => setPrioridade(e.target.value)}
                >
                  <option value="baixa">Baixa</option>
                  <option value="media">Média</option>
                  <option value="alta">Alta</option>
                </select>
              </div>

              <button type="submit" className="btn-submit" disabled={loading}>
                {loading ? 'Abrindo...' : 'Abrir Chamado'}
              </button>
            </form>
          </div>

          {/* Lista de chamados */}
          <div className="chamados-list">
            <h3>Chamados Abertos</h3>
            {chamados.length > 0 ? (
              chamados.map((chamado) => (
                <div key={chamado.id} className="chamado-item">
                  <div className="chamado-header">
                    <h4>{chamado.titulo}</h4>
                    <span
                      className="prioridade-badge"
                      style={{ backgroundColor: getPrioridadeColor(chamado.prioridade) }}
                    >
                      {chamado.prioridade.toUpperCase()}
                    </span>
                  </div>
                  <p className="status">Status: {getStatusText(chamado.status)}</p>
                  <p className="descricao">{chamado.descricao}</p>
                  <p className="date">
                    {new Date(chamado.data).toLocaleDateString('pt-BR')}
                  </p>
                  {chamado.status !== 'resolvido' && (
                    <button
                      className="btn-resolve"
                      onClick={() => handleResolve(chamado.id)}
                    >
                      Resolver
                    </button>
                  )}
                </div>
              ))
            ) : (
              <p>Nenhum chamado encontrado.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chamados;
