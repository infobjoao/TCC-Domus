/**
 * Rotas de Autenticação
 * 
 * Define as rotas relacionadas a login e registro de usuários.
 */

const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');

// Rota para registrar novo usuário
// POST /api/auth/register
router.post('/register', AuthController.register);

// Rota para fazer login
// POST /api/auth/login
router.post('/login', AuthController.login);

module.exports = router;

