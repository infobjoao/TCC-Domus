/**
 * Middleware de Autenticação JWT
 * 
 * Este middleware verifica se o usuário está autenticado
 * através do token JWT enviado no header da requisição.
 */

const jwt = require('jsonwebtoken');

/**
 * Middleware para verificar autenticação
 * 
 * Verifica se existe um token válido no header Authorization
 * e adiciona os dados do usuário no objeto req.user
 */
const authenticateToken = (req, res, next) => {
  // Busca o token no header Authorization
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Formato: "Bearer TOKEN"

  // Se não houver token, retorna erro 401
  if (!token) {
    return res.status(401).json({ 
      message: 'Token de autenticação não fornecido' 
    });
  }

  // Verifica se o token é válido
  jwt.verify(token, process.env.JWT_SECRET || 'secret', (err, user) => {
    if (err) {
      return res.status(403).json({ 
        message: 'Token inválido ou expirado' 
      });
    }

    // Adiciona os dados do usuário no objeto req para uso nas rotas
    req.user = user;
    next(); // Continua para a próxima função (controller)
  });
};

/**
 * Middleware para verificar se o usuário é síndico
 * 
 * Deve ser usado após authenticateToken
 */
const requireSindico = (req, res, next) => {
  if (req.user.role !== 'sindico') {
    return res.status(403).json({ 
      message: 'Acesso negado. Apenas síndicos podem acessar esta rota.' 
    });
  }
  next();
};

/**
 * Middleware para verificar se o usuário é morador
 * 
 * Deve ser usado após authenticateToken
 */
const requireMorador = (req, res, next) => {
  if (req.user.role !== 'morador') {
    return res.status(403).json({ 
      message: 'Acesso negado. Apenas moradores podem acessar esta rota.' 
    });
  }
  next();
};

module.exports = {
  authenticateToken,
  requireSindico,
  requireMorador
};

