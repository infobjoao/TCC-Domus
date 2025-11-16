/**
 * Controller de Finanças
 *
 * Gerencia as operações relacionadas às finanças do condomínio.
 */

const { readDB, writeDB } = require('../config/db');

/**
 * Busca moradores cadastrados (síndico)
 */
const getMoradores = async (req, res) => {
  try {
    const db = readDB();
    const moradores = db.users
      .filter(user => user.role === 'morador')
      .map(user => ({
        id: user.id,
        nome: user.name,
        email: user.email
      }));

    res.json(moradores);
  } catch (error) {
    console.error('Erro ao buscar moradores:', error);
    res.status(500).json({ message: 'Erro ao buscar moradores' });
  }
};

/**
 * Busca todas as finanças (síndico)
 */
const getAll = async (req, res) => {
  try {
    // Busca todas as transações
    const db = readDB();
    const transacoes = db.financas.sort((a, b) => new Date(b.data) - new Date(a.data));

    // Calcula totais
    const receitas = transacoes
      .filter(f => f.tipo === 'receita')
      .reduce((sum, f) => sum + parseFloat(f.valor), 0);

    const despesas = transacoes
      .filter(f => f.tipo === 'despesa')
      .reduce((sum, f) => sum + parseFloat(f.valor), 0);

    const saldo = receitas - despesas;

    res.json({
      receitas,
      despesas,
      saldo,
      transacoes
    });
  } catch (error) {
    console.error('Erro ao buscar finanças:', error);
    res.status(500).json({ message: 'Erro ao buscar finanças' });
  }
};

/**
 * Busca finanças do morador
 */
const getMorador = async (req, res) => {
  try {
    const userId = req.user.id;

    // Busca transações relacionadas ao morador
    const db = readDB();
    const transacoes = db.financas.filter(t => t.moradorId === userId).sort((a, b) => new Date(b.data) - new Date(a.data));

    const totalDevido = transacoes
      .filter(t => t.tipo === 'devido')
      .reduce((sum, t) => sum + parseFloat(t.valor), 0);

    const totalPago = transacoes
      .filter(t => t.tipo === 'pago')
      .reduce((sum, t) => sum + parseFloat(t.valor), 0);

    const saldo = totalDevido - totalPago;

    res.json({
      totalDevido,
      totalPago,
      saldo,
      transacoes
    });
  } catch (error) {
    console.error('Erro ao buscar finanças do morador:', error);
    res.status(500).json({ message: 'Erro ao buscar finanças' });
  }
};

/**
 * Aplica valor a um morador (síndico)
 */
const aplicarValor = async (req, res) => {
  try {
    const { moradorId, valor, tipo } = req.body;

    if (!moradorId || !valor || !tipo) {
      return res.status(400).json({
        message: 'Morador, valor e tipo são obrigatórios'
      });
    }

    // Verifica se o morador existe
    const db = readDB();
    const morador = db.users.find(u => u.id === parseInt(moradorId) && u.role === 'morador');
    if (!morador) {
      return res.status(404).json({
        message: 'Morador não encontrado'
      });
    }

    // Cria a transação financeira
    const novaTransacao = {
      id: db.financas.length + 1,
      descricao: `${tipo.charAt(0).toUpperCase() + tipo.slice(1)} - ${morador.name}`,
      valor: parseFloat(valor),
      tipo: tipo === 'pagamento' ? 'pago' : 'devido',
      data: new Date().toISOString().split('T')[0],
      moradorId: parseInt(moradorId),
      createdAt: new Date().toISOString()
    };

    // Adiciona ao banco de dados
    db.financas.push(novaTransacao);
    writeDB(db);

    res.status(201).json({
      message: 'Valor aplicado com sucesso',
      transacao: novaTransacao
    });
  } catch (error) {
    console.error('Erro ao aplicar valor:', error);
    res.status(500).json({ message: 'Erro ao aplicar valor' });
  }
};

/**
 * Cria nova transação financeira
 */
const create = async (req, res) => {
  try {
    const { descricao, valor, tipo, data, morador_id } = req.body;

    if (!descricao || !valor || !tipo) {
      return res.status(400).json({
        message: 'Descrição, valor e tipo são obrigatórios'
      });
    }

    // Cria a nova transação
    const db = readDB();
    const novaTransacao = {
      id: db.financas.length + 1,
      descricao,
      valor: parseFloat(valor),
      tipo,
      data: data || new Date().toISOString().split('T')[0],
      moradorId: morador_id || null,
      createdAt: new Date().toISOString()
    };

    // Adiciona ao banco de dados
    db.financas.push(novaTransacao);
    writeDB(db);

    res.status(201).json(novaTransacao);
  } catch (error) {
    console.error('Erro ao criar transação:', error);
    res.status(500).json({ message: 'Erro ao criar transação' });
  }
};

/**
 * Atualiza uma transação
 */
const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { descricao, valor, tipo, data } = req.body;

    // Verifica se a transação existe
    const db = readDB();
    const index = db.financas.findIndex(f => f.id === parseInt(id));
    if (index === -1) {
      return res.status(404).json({ message: 'Transação não encontrada' });
    }

    // Atualiza a transação
    const transacao = db.financas[index];
    if (descricao) transacao.descricao = descricao;
    if (valor) transacao.valor = parseFloat(valor);
    if (tipo) transacao.tipo = tipo;
    if (data) transacao.data = data;

    writeDB(db);
    res.json(transacao);
  } catch (error) {
    console.error('Erro ao atualizar transação:', error);
    res.status(500).json({ message: 'Erro ao atualizar transação' });
  }
};

/**
 * Deleta uma transação
 */
const remove = async (req, res) => {
  try {
    const { id } = req.params;

    // Verifica se a transação existe
    const db = readDB();
    const index = db.financas.findIndex(f => f.id === parseInt(id));
    if (index === -1) {
      return res.status(404).json({ message: 'Transação não encontrada' });
    }

    // Deleta a transação
    db.financas.splice(index, 1);
    writeDB(db);

    res.json({ message: 'Transação deletada com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar transação:', error);
    res.status(500).json({ message: 'Erro ao deletar transação' });
  }
};

module.exports = {
  getMoradores,
  getAll,
  getMorador,
  aplicarValor,
  create,
  update,
  remove
};
