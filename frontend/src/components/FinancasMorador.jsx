import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import { financasService } from '../services/api';
import './Financas.scss';

/**
 * Componente FinancasMorador - Visualização financeira do morador
 * 
 * Permite ao morador visualizar suas próprias finanças,
 * incluindo taxas de condomínio e pagamentos.
 */
const FinancasMorador = () => {
  const [user, setUser] = useState('Usuário');
  const [financas, setFinancas] = useState({
    totalDevido: 0,
    totalPago: 0,
    saldo: 0,
    transacoes: []
  });
  const [loading, setLoading] = useState(true);
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
    
    // Carrega dados financeiros do morador
    loadFinancas();
  }, [navigate]);

  // Carrega os dados financeiros da API
  const loadFinancas = async () => {
    try {
      setLoading(true);
      const data = await financasService.getMorador();
      setFinancas(data);
    } catch (error) {
      console.error('Erro ao carregar finanças:', error);
      // Dados de exemplo
      setFinancas({
        totalDevido: 500,
        totalPago: 300,
        saldo: 200,
        transacoes: [
          { id: 1, data: '2023-10-01', descricao: 'Taxa Condomínio Outubro', valor: 500, tipo: 'devido' },
          { id: 2, data: '2023-10-05', descricao: 'Pagamento Recebido', valor: 300, tipo: 'pago' }
        ]
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="financas-container">
      <Sidebar userRole="morador" />
      <Header userName={user} />
      
      <div className="content">
        <h2>Minhas Finanças</h2>
        <p>Visualize suas taxas de condomínio e histórico de pagamentos.</p>
        
        {loading ? (
          <p>Carregando...</p>
        ) : (
          <>
            {/* Cards de resumo financeiro */}
            <div className="finance-overview">
              <div className="card despesa">
                <h3>Total Devido</h3>
                <p className="valor">R$ {financas.totalDevido.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
              </div>
              
              <div className="card receita">
                <h3>Total Pago</h3>
                <p className="valor">R$ {financas.totalPago.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
              </div>
              
              <div className="card saldo">
                <h3>Saldo Pendente</h3>
                <p className="valor">R$ {financas.saldo.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
              </div>
            </div>
            
            {/* Tabela de transações */}
            <div className="transactions">
              <h3>Histórico de Transações</h3>
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
                            {transacao.tipo === 'pago' ? 'Pago' : 'Devido'}
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

export default FinancasMorador;

