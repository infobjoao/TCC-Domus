-- Schema do Banco de Dados MySQL para o Sistema DOMUS
-- TCC de 4 alunos - Sistema de Gestão de Condomínios

-- Criar banco de dados
CREATE DATABASE domus_db;
USE domus_db;

-- Tabela de Usuários
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('sindico', 'morador') NOT NULL DEFAULT 'morador',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Finanças
CREATE TABLE financas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    descricao VARCHAR(255) NOT NULL,
    valor DECIMAL(10,2) NOT NULL,
    tipo ENUM('receita', 'despesa', 'devido', 'pago') NOT NULL,
    morador_id INT NULL,
    data DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (morador_id) REFERENCES users(id)
);

-- Tabela de Mensagens
CREATE TABLE mensagens (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    conteudo TEXT NOT NULL,
    remetente VARCHAR(255) NOT NULL,
    destinatario ENUM('all', 'specific') NOT NULL DEFAULT 'all',
    destinatario_id INT NULL,
    data TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (destinatario_id) REFERENCES users(id)
);

-- Tabela de Chamados
CREATE TABLE chamados (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    descricao TEXT NOT NULL,
    prioridade ENUM('baixa', 'media', 'alta') NOT NULL DEFAULT 'media',
    status ENUM('pendente', 'em_andamento', 'resolvido') NOT NULL DEFAULT 'pendente',
    morador_id INT NOT NULL,
    morador_nome VARCHAR(255) NOT NULL,
    resolvido_por VARCHAR(255) NULL,
    resolvido_em TIMESTAMP NULL,
    data TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (morador_id) REFERENCES users(id)
);

-- Dados simples para teste (como alunos fariam)
INSERT INTO users (name, email, password, role) VALUES
('João Síndico', 'sindico@email.com', '$2a$10$hashsimulado123', 'sindico'),
('Maria Moradora', 'maria@email.com', '$2a$10$hashsimulado456', 'morador'),
('Pedro Morador', 'pedro@email.com', '$2a$10$hashsimulado789', 'morador');

INSERT INTO financas (descricao, valor, tipo, data) VALUES
('Taxa Condomínio Janeiro', 1200.00, 'receita', '2024-01-01'),
('Conta de Luz', 350.00, 'despesa', '2024-01-10'),
('Manutenção Portão', 150.00, 'despesa', '2024-01-15');

INSERT INTO mensagens (titulo, conteudo, remetente, destinatario) VALUES
('Aviso Importante', 'Reunião de condomínio amanhã às 20h na sala de reuniões.', 'João Síndico', 'all'),
('Manutenção', 'Amanhã o elevador ficará parado para manutenção.', 'João Síndico', 'all');

INSERT INTO chamados (titulo, descricao, prioridade, morador_id, morador_nome) VALUES
('Lâmpada Queimada', 'A lâmpada do corredor do 2º andar está queimada.', 'media', 2, 'Maria Moradora'),
('Vazamento', 'Vazamento na cozinha do apartamento 101.', 'alta', 3, 'Pedro Morador');
