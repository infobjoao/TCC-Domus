const db = require('../config/db');

class UserRepository {
  async create(userData) {
    const query = 'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)';
    const values = [userData.name, userData.email, userData.password, userData.role];
    return new Promise((resolve, reject) => {
      db.query(query, values, (err, result) => {
        if (err) reject(err);
        resolve({ id: result.insertId, ...userData });
      });
    });
  }

  async findByEmail(email) {
    const query = 'SELECT * FROM users WHERE email = ?';
    return new Promise((resolve, reject) => {
      db.query(query, [email], (err, results) => {
        if (err) reject(err);
        resolve(results[0]);
      });
    });
  }

  async findById(id) {
    const query = 'SELECT * FROM users WHERE id = ?';
    return new Promise((resolve, reject) => {
      db.query(query, [id], (err, results) => {
        if (err) reject(err);
        resolve(results[0]);
      });
    });
  }
}

module.exports = new UserRepository();
