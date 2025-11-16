import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import { financasService } from '../services/api';
import './Financas.scss';

/**
 * Componente Financas - Gestão financeira do condomínio (Síndico)
 *
 * Permite ao síndico visualizar e gerenciar as finanças do condomínio,
 * incluindo receitas, despesas e transações. Também permite aplicar valores
 * às finanças dos moradores.
 */
const Financas = () => {
  const [user, setUser] = useState('Usuário');
  const [financas, setFinancas] = useState({
    receitas: 0,
    despesas: 0,
    saldo: 0,
    transacoes: []
  });
  const [moradores, setMoradores] = useState([]);
  const [selectedMorador, setSelectedMorador] = useState('');
  const [valorAplicar, setValorAplicar] = useState('');
  const [tipoAplicacao, setTipoAplicacao] = useState('taxa');
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
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

    // Carrega dados financeiros e moradores
    loadFinancas();
    loadMoradores();
  }, [navigate]);

  // Carrega os dados financeiros da API
  const loadFinancas = async () => {
    try {
      setLoading(true);
      const data = await financasService.getAll();
      setFinancas(data);
    } catch (error) {
      console.error('Erro ao carregar finanças:', error);
      // Dados de exemplo em caso de erro
      setFinancas({
        receitas: 10000,
        despesas: 5000,
        saldo: 5000,
        transacoes: [
          { id: 1, data: '2023-10-01', descricao: 'Manutenção Elevador', valor: 1000, tipo: 'despesa' },
          { id: 2, data: '2023-10-05', descricao: 'Taxa Condomínio', valor: 2000, tipo: 'receita' }
        ]
      });
    } finally {
      setLoading(false);
    }
  };

  // Carrega lista de moradores da API
  const loadMoradores = async () => {
    try {
      const data = await financasService.getMoradores();
      setMoradores(data);
    } catch (error) {
      console.error('Erro ao carregar moradores:', error);
      // Dados de exemplo em caso de erro
      setMoradores([
        { id: 1, nome: 'João Silva' },
        { id: 2, nome: 'Maria Santos' },
        { id: 3, nome: 'Pedro Oliveira' }
      ]);
    }
  };

  // Aplica valor às finanças de um morador
  const handleAplicarValor = async (e) => {
    e.preventDefault();

    if (!selectedMorador || !valorAplicar) {
      alert('Por favor, selecione um morador e informe o valor.');
      return;
    }

    try {
      setApplying(true);
      await financasService.aplicarValor({
        moradorId: selectedMorador,
        valor: parseFloat(valorAplicar),
        tipo: tipoAplicacao
      });

      alert('Valor aplicado com sucesso!');
      setSelectedMorador('');
      setValorAplicar('');
      setTipoAplicacao('taxa');

      // Recarrega os dados financeiros
      loadFinancas();
    } catch (error) {
      console.error('Erro ao aplicar valor:', error);
      alert('Erro ao aplicar valor. Tente novamente.');
    } finally {
      setApplying(false);
    }
  };

  return (
    <div className="financas-container">
      <Sidebar userRole="sindico" />
      <Header userName={user} />

      <div className="content">
        <h2>Finanças do Condomínio</h2>
        <p>Gerencie as finanças, despesas e receitas do condomínio.</p>

        {loading ? (
          <p>Carregando...</p>
        ) : (
          <>
            {/* Cards de resumo financeiro */}
            <div className="finance-overview">
              <div className="card receita">
                <h3>Receitas</h3>
                <p className="valor">R$ {financas.receitas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
              </div>

              <div className="card despesa">
                <h3>Despesas</h3>
                <p className="valor">R$ {financas.despesas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
              </div>

              <div className="card saldo">
                <h3>Saldo</h3>
                <p className="valor">R$ {financas.saldo.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
              </div>
            </div>

            {/* Formulário para aplicar valores aos moradores */}
            <div className="apply-value-section">
              <h3>Aplicar Valores aos Moradores</h3>
              <form onSubmit={handleAplicarValor}>
                <div className="form-group">
                  <label htmlFor="morador">Morador:</label>
                  <select
                    id="morador"
                    value={selectedMorador}
                    onChange={(e) => setSelectedMorador(e.target.value)}
                    required
                  >
                    <option value="">Selecione um morador</option>
                    {moradores.map((morador) => (
                      <option key={morador.id} value={morador.id}>
                        {morador.nome}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="tipo">Tipo:</label>
                  <select
                    id="tipo"
                    value={tipoAplicacao}
                    onChange={(e) => setTipoAplicacao(e.target.value)}
                  >
                    <option value="taxa">Taxa de Condomínio</option>
                    <option value="multa">Multa</option>
                    <option value="pagamento">Pagamento Recebido</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="valor">Valor (R$):</label>
                  <input
                    type="number"
                    id="valor"
                    step="0.01"
                    min="0"
                    value={valorAplicar}
                    onChange={(e) => setValorAplicar(e.target.value)}
                    required
                  />
                </div>

                <button type="submit" className="btn-apply" disabled={applying}>
                  {applying ? 'Aplicando...' : 'Aplicar Valor'}
                </button>
              </form>
            </div>

            {/* Tabela de transações */}
            <div className="transactions">
              <h3>Transações Recentes</h3>
              <table>
                <thead>
                  <tr>
                    <th>Data</th>
                    <th>Descrição</th>
                    <th>Valor</th>
                    <th>Tipo</th>
                  </tr>
                </thead>
                <tbody>
                  {financas.transacoes.length > 0 ? (
                    financas.transacoes.map((transacao) => (
                      <tr key={transacao.id}>
                        <td>{new Date(transacao.data).toLocaleDateString('pt-BR')}</td>
                        <td>{transacao.descricao}</td>
                        <td>R$ {transacao.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                        <td>
                          <span className={`badge ${transacao.tipo}`}>
                            {transacao.tipo === 'receita' ? 'Receita' : 'Despesa'}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" style={{ textAlign: 'center' }}>
                        Nenhuma transação encontrada
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Financas;
