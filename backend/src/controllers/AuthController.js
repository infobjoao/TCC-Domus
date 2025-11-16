/**
 * Controller de Autenticação
 *
 * Gerencia as operações de login e registro de usuários,
 * incluindo geração de tokens JWT.
 */

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { readDB, writeDB } = require('../config/db');

/**
 * Registra um novo usuário no sistema
 */
const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Validações básicas
    if (!name || !email || !password || !role) {
      return res.status(400).json({
        message: 'Todos os campos são obrigatórios'
      });
    }

    if (role !== 'sindico' && role !== 'morador') {
      return res.status(400).json({
        message: 'Tipo de usuário inválido'
      });
    }

    // Verifica se o email já está cadastrado
    const db = readDB();
    const existingUser = db.users.find(u => u.email === email);
    if (existingUser) {
      return res.status(400).json({
        message: 'Email já cadastrado'
      });
    }

    // Criptografa a senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Cria o novo usuário
    const newUser = {
      id: db.users.length + 1,
      name,
      email,
      password: hashedPassword,
      role,
      createdAt: new Date().toISOString()
    };

    // Adiciona ao banco de dados
    db.users.push(newUser);
    writeDB(db);

    // Retorna sucesso
    res.status(201).json({
      message: 'Usuário cadastrado com sucesso',
      user: {
        id: newUser.id,
        name,
        email,
        role
      }
    });
  } catch (error) {
    console.error('Erro no registro:', error);
    res.status(500).json({
      message: 'Erro ao cadastrar usuário'
    });
  }
};

/**
 * Faz login do usuário e retorna token JWT
 */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validações básicas
    if (!email || !password) {
      return res.status(400).json({
        message: 'Email e senha são obrigatórios'
      });
    }

    // Busca o usuário pelo email
    const db = readDB();
    const user = db.users.find(u => u.email === email);
    if (!user) {
      return res.status(401).json({
        message: 'Credenciais inválidas'
      });
    }

    // Verifica a senha
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        message: 'Credenciais inválidas'
      });
    }

    // Gera o token JWT
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role
      },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '24h' }
    );

    // Retorna o token e informações do usuário
    res.json({
      token,
      role: user.role,
      name: user.name,
      email: user.email
    });
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({
      message: 'Erro ao fazer login'
    });
  }
};

module.exports = {
  register,
  login
};

