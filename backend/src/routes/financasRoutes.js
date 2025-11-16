/**
 * Rotas de Finanças
 *
 * Define as rotas relacionadas à gestão financeira do condomínio.
 */

const express = require('express');
const router = express.Router();
const FinancasController = require('../controllers/FinancasController');
const { authenticateToken, requireSindico } = require('../middlewares/auth');

// Todas as rotas abaixo exigem autenticação
router.use(authenticateToken);

// Rota para buscar moradores cadastrados (apenas síndico)
// GET /api/financas/moradores
router.get('/moradores', requireSindico, FinancasController.getMoradores);

// Rota para buscar todas as finanças (apenas síndico)
// GET /api/financas
router.get('/', requireSindico, FinancasController.getAll);

// Rota para buscar finanças do morador
// GET /api/financas/morador
router.get('/morador', FinancasController.getMorador);

// Rota para aplicar valor a um morador (apenas síndico)
// POST /api/financas/aplicar-valor
router.post('/aplicar-valor', requireSindico, FinancasController.aplicarValor);

// Rota para criar nova transação (apenas síndico)
// POST /api/financas
router.post('/', requireSindico, FinancasController.create);

// Rota para atualizar transação (apenas síndico)
// PUT /api/financas/:id
router.put('/:id', requireSindico, FinancasController.update);

// Rota para deletar transação (apenas síndico)
// DELETE /api/financas/:id
router.delete('/:id', requireSindico, FinancasController.remove);

module.exports = router;
