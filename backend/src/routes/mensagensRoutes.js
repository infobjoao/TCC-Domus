/**
 * Rotas de Mensagens
 * 
 * Define as rotas relacionadas ao sistema de mensagens.
 */

const express = require('express');
const router = express.Router();
const MensagensController = require('../controllers/MensagensController');
const { authenticateToken, requireSindico } = require('../middlewares/auth');

// Todas as rotas abaixo exigem autenticação
router.use(authenticateToken);

// Rota para buscar todas as mensagens (síndico)
// GET /api/mensagens
router.get('/', requireSindico, MensagensController.getAll);

// Rota para buscar mensagens do morador
// GET /api/mensagens/morador
router.get('/morador', MensagensController.getMorador);

// Rota para criar nova mensagem (síndico)
// POST /api/mensagens
router.post('/', requireSindico, MensagensController.create);

// Rota para deletar mensagem (síndico)
// DELETE /api/mensagens/:id
router.delete('/:id', requireSindico, MensagensController.remove);

module.exports = router;

