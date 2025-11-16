/**
 * Controller de Mensagens
 * 
 * Gerencia as operações relacionadas às mensagens do sistema.
 */

const { readDB, writeDB } = require('../config/db');

/**
 * Busca todas as mensagens (síndico)
 */
const getAll = (req, res) => {
  try {
    const db = readDB();
    res.json(db.mensagens.sort((a, b) => new Date(b.data) - new Date(a.data)));
  } catch (error) {
    console.error('Erro ao buscar mensagens:', error);
    res.status(500).json({ message: 'Erro ao buscar mensagens' });
  }
};

/**
 * Busca mensagens do morador
 */
const getMorador = (req, res) => {
  try {
    const db = readDB();
    const userId = req.user.id;

    // Busca mensagens enviadas para todos ou para o morador específico
    const mensagens = db.mensagens.filter(
      m => m.destinatario === 'all' || m.destinatarioId === userId
    );

    res.json(mensagens.sort((a, b) => new Date(b.data) - new Date(a.data)));
  } catch (error) {
    console.error('Erro ao buscar mensagens do morador:', error);
    res.status(500).json({ message: 'Erro ao buscar mensagens' });
  }
};

/**
 * Cria nova mensagem
 */
const create = (req, res) => {
  try {
    const { destinatario, assunto, mensagem } = req.body;

    if (!assunto || !mensagem) {
      return res.status(400).json({ 
        message: 'Assunto e mensagem são obrigatórios' 
      });
    }

    const db = readDB();
    
    const novaMensagem = {
      id: db.mensagens.length + 1,
      titulo: assunto,
      remetente: req.user.name || 'Síndico',
      conteudo: mensagem,
      destinatario: destinatario || 'all',
      data: new Date().toISOString(),
      createdAt: new Date().toISOString()
    };

    db.mensagens.push(novaMensagem);
    writeDB(db);

    res.status(201).json(novaMensagem);
  } catch (error) {
    console.error('Erro ao criar mensagem:', error);
    res.status(500).json({ message: 'Erro ao criar mensagem' });
  }
};

/**
 * Deleta uma mensagem
 */
const remove = (req, res) => {
  try {
    const { id } = req.params;

    const db = readDB();
    const index = db.mensagens.findIndex(m => m.id === parseInt(id));

    if (index === -1) {
      return res.status(404).json({ message: 'Mensagem não encontrada' });
    }

    db.mensagens.splice(index, 1);
    writeDB(db);

    res.json({ message: 'Mensagem deletada com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar mensagem:', error);
    res.status(500).json({ message: 'Erro ao deletar mensagem' });
  }
};

module.exports = {
  getAll,
  getMorador,
  create,
  remove
};

