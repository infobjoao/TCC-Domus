/**
 * Controller de Chamados
 * 
 * Gerencia as operações relacionadas aos chamados de manutenção.
 */

const { readDB, writeDB } = require('../config/db');

/**
 * Busca todos os chamados (síndico)
 */
const getAll = (req, res) => {
  try {
    const db = readDB();
    res.json(db.chamados.sort((a, b) => new Date(b.data) - new Date(a.data)));
  } catch (error) {
    console.error('Erro ao buscar chamados:', error);
    res.status(500).json({ message: 'Erro ao buscar chamados' });
  }
};

/**
 * Busca chamados do morador
 */
const getMorador = (req, res) => {
  try {
    const db = readDB();
    const userId = req.user.id;

    // Busca chamados criados pelo morador
    const chamados = db.chamados.filter(c => c.moradorId === userId);

    res.json(chamados.sort((a, b) => new Date(b.data) - new Date(a.data)));
  } catch (error) {
    console.error('Erro ao buscar chamados do morador:', error);
    res.status(500).json({ message: 'Erro ao buscar chamados' });
  }
};

/**
 * Cria novo chamado
 */
const create = (req, res) => {
  try {
    const { titulo, descricao, prioridade } = req.body;

    if (!titulo || !descricao) {
      return res.status(400).json({ 
        message: 'Título e descrição são obrigatórios' 
      });
    }

    const db = readDB();
    
    const novoChamado = {
      id: db.chamados.length + 1,
      titulo,
      descricao,
      prioridade: prioridade || 'media',
      status: 'pendente',
      moradorId: req.user.id,
      moradorNome: req.user.name || 'Morador',
      data: new Date().toISOString(),
      createdAt: new Date().toISOString()
    };

    db.chamados.push(novoChamado);
    writeDB(db);

    res.status(201).json(novoChamado);
  } catch (error) {
    console.error('Erro ao criar chamado:', error);
    res.status(500).json({ message: 'Erro ao criar chamado' });
  }
};

/**
 * Resolve um chamado
 */
const resolve = (req, res) => {
  try {
    const { id } = req.params;

    const db = readDB();
    const index = db.chamados.findIndex(c => c.id === parseInt(id));

    if (index === -1) {
      return res.status(404).json({ message: 'Chamado não encontrado' });
    }

    db.chamados[index].status = 'resolvido';
    db.chamados[index].resolvidoEm = new Date().toISOString();
    db.chamados[index].resolvidoPor = req.user.name || 'Síndico';

    writeDB(db);

    res.json(db.chamados[index]);
  } catch (error) {
    console.error('Erro ao resolver chamado:', error);
    res.status(500).json({ message: 'Erro ao resolver chamado' });
  }
};

/**
 * Deleta um chamado
 */
const remove = (req, res) => {
  try {
    const { id } = req.params;

    const db = readDB();
    const index = db.chamados.findIndex(c => c.id === parseInt(id));

    if (index === -1) {
      return res.status(404).json({ message: 'Chamado não encontrado' });
    }

    db.chamados.splice(index, 1);
    writeDB(db);

    res.json({ message: 'Chamado deletado com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar chamado:', error);
    res.status(500).json({ message: 'Erro ao deletar chamado' });
  }
};

module.exports = {
  getAll,
  getMorador,
  create,
  resolve,
  remove
};

