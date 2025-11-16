/**
 * Configuração do Banco de Dados
 * 
 * Por enquanto, estamos usando um arquivo JSON local
 * para simular um banco de dados. Isso simplifica o TCC
 * sem precisar configurar MySQL ou MongoDB.
 * 
 * Em produção, você pode substituir isso por uma conexão
 * real com banco de dados.
 */

const fs = require('fs');
const path = require('path');

// Caminho do arquivo JSON que simula o banco de dados
const DB_PATH = path.join(__dirname, '../../data/db.json');

/**
 * Inicializa o banco de dados com estrutura padrão
 */
const initDB = () => {
  // Cria o diretório data se não existir
  const dataDir = path.dirname(DB_PATH);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  // Se o arquivo não existir, cria com estrutura inicial
  if (!fs.existsSync(DB_PATH)) {
    const initialData = {
      users: [],
      financas: [],
      mensagens: [],
      chamados: []
    };
    fs.writeFileSync(DB_PATH, JSON.stringify(initialData, null, 2));
    console.log('📁 Banco de dados inicializado');
  }
};

/**
 * Lê todos os dados do banco
 */
const readDB = () => {
  try {
    const data = fs.readFileSync(DB_PATH, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Erro ao ler banco de dados:', error);
    return { users: [], financas: [], mensagens: [], chamados: [] };
  }
};

/**
 * Salva dados no banco
 */
const writeDB = (data) => {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error('Erro ao salvar no banco de dados:', error);
    return false;
  }
};

// Inicializa o banco quando o módulo é carregado
initDB();

module.exports = {
  readDB,
  writeDB,
  DB_PATH
};

