/**
 * Rotas de Chamados
 * 
 * Define as rotas relacionadas ao sistema de chamados de manutenção.
 */

const express = require('express');
const router = express.Router();
const ChamadosController = require('../controllers/ChamadosController');
const { authenticateToken, requireSindico } = require('../middlewares/auth');

// Todas as rotas abaixo exigem autenticação
router.use(authenticateToken);

// Rota para buscar todos os chamados (síndico)
// GET /api/chamados
router.get('/', requireSindico, ChamadosController.getAll);

// Rota para buscar chamados do morador
// GET /api/chamados/morador
router.get('/morador', ChamadosController.getMorador);

// Rota para criar novo chamado
// POST /api/chamados
router.post('/', ChamadosController.create);

// Rota para resolver chamado (síndico)
// PUT /api/chamados/:id/resolve
router.put('/:id/resolve', requireSindico, ChamadosController.resolve);

// Rota para deletar chamado (síndico)
// DELETE /api/chamados/:id
router.delete('/:id', requireSindico, ChamadosController.remove);

module.exports = router;

