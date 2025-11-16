const AuthService = require('../services/AuthService');

class AuthController {
  async register(req, res) {
    try {
      const { name, email, password, role } = req.body;
      const result = await AuthService.register(name, email, password, role);
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const result = await AuthService.login(email, password);
      res.json(result);
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  }
}

module.exports = new AuthController();
