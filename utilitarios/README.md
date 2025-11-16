# 🏠 Sistema DOMUS - Gestão de Condomínios

<div align="center">

![DOMUS](https://img.shields.io/badge/DOMUS-Gestão%20de%20Condomínios-blue?style=for-the-badge)
![TCC](https://img.shields.io/badge/TCC-Trabalho%20de%20Conclusão-green?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Completo-success?style=for-the-badge)

**Sistema completo de gestão de condomínios desenvolvido como Trabalho de Conclusão de Curso (TCC)**

</div>

---

## 📋 Sobre o Projeto

O **DOMUS** é uma plataforma web moderna que conecta síndicos e moradores, facilitando a administração de condomínios através de funcionalidades completas e intuitivas.

### ✨ Funcionalidades Principais

| Funcionalidade | Descrição | Ícone |
|---------------|-----------|-------|
| 💰 **Gestão Financeira** | Controle completo de receitas, despesas e saldo do condomínio | 💰 |
| 💬 **Sistema de Mensagens** | Comunicação direta e eficiente entre síndico e moradores | 💬 |
| 🔧 **Chamados de Manutenção** | Sistema completo de solicitações e acompanhamento | 🔧 |
| 📊 **Dashboard Intuitivo** | Visão geral das principais funcionalidades | 📊 |

---

## 📁 Estrutura do Projeto

```
TCC Domus/
│
├── 📂 frontend/              # Front-end React + SASS
│   ├── src/                  # Código fonte React
│   │   ├── components/       # Componentes React
│   │   ├── services/         # Serviços de API
│   │   ├── routes/           # Rotas React
│   │   └── styles/           # Estilos SCSS
│   ├── public/               # Arquivos estáticos
│   ├── package.json          # Dependências do front-end
│   └── src/setupProxy.js    # Configuração do proxy para API
│
├── 📂 backend/               # Back-end Node.js + Express
│   ├── src/                  # Código fonte do servidor
│   │   ├── controllers/      # Controllers
│   │   ├── routes/           # Rotas da API
│   │   ├── middlewares/      # Middlewares
│   │   └── config/           # Configurações
│   ├── data/                 # Banco de dados (JSON)
│   └── package.json          # Dependências do back-end
│
└── 📄 Arquivos Raiz
    ├── README.md             # Este arquivo
    ├── DOCUMENTACAO_FRONTEND_DOMUS.md
    ├── DOCUMENTACAO_BACKEND_DOMUS.md
    └── package.json          # Scripts de orquestração
```

---

## 🛠️ Stack Tecnológica

### 🎨 Front-end
- ⚛️ **React 18.2.0** - Biblioteca JavaScript para interfaces
- 🛣️ **React Router DOM 6.20.0** - Roteamento
- 🎨 **SASS/SCSS** - Pré-processador CSS
- 📡 **Axios 1.6.2** - Cliente HTTP para API
- 🚀 **Create React App** - Ferramenta de criação e configuração

### ⚙️ Back-end
- 🟢 **Node.js** - Runtime JavaScript
- 🚀 **Express 4.18.2** - Framework web
- 🔐 **JWT** - Autenticação com tokens
- 🔒 **bcryptjs** - Criptografia de senhas
- 📄 **JSON** - Banco de dados simulado

---

## 🚀 Como Executar

### 📦 Pré-requisitos

- ✅ Node.js (versão 14 ou superior)
- ✅ npm ou yarn instalado

---

### 🔧 Instalação

#### **Opção 1: Instalação Automática** ⭐ (Recomendado)

```bash
npm run install:all
```

#### **Opção 2: Instalação Manual**

```bash
# 1️⃣ Instalar dependências da raiz
npm install

# 2️⃣ Instalar dependências do front-end
cd frontend
npm install
cd ..

# 3️⃣ Instalar dependências do back-end
cd backend
npm install
cd ..
```

---

### ▶️ Execução

#### 🎯 Desenvolvimento (Recomendado)

##### **Opção A: Executar Ambos Simultaneamente** ⚡

```bash
npm run dev
```

> 🎉 Isso iniciará automaticamente:
> - 🔵 Back-end na porta **5000**
> - 🟢 Front-end na porta **3000**

##### **Opção B: Executar Separadamente**

**Terminal 1 - Back-end:**
```bash
npm run dev:backend
```
> 🌐 Servidor disponível em: `http://localhost:5000`

**Terminal 2 - Front-end:**
```bash
npm run dev:frontend
```
> 🌐 Aplicação disponível em: `http://localhost:3000`

#### 🏭 Produção

**Back-end:**
```bash
npm run start:backend
```

**Front-end:**
```bash
npm run build:frontend
```

---

## 📚 Documentação Completa

| Documento | Descrição | Link |
|-----------|-----------|------|
| 📖 **Front-end** | Documentação completa do React | [Ver Documentação](DOCUMENTACAO_FRONTEND_DOMUS.md) |
| 📖 **Back-end** | Documentação completa da API | [Ver Documentação](DOCUMENTACAO_BACKEND_DOMUS.md) |
| ⚡ **Guia Rápido** | Instruções rápidas de uso | [Ver Guia](INSTRUCOES_RAPIDAS.md) |
| 📁 **Estrutura** | Detalhamento da estrutura | [Ver Estrutura](ESTRUTURA_PROJETO.md) |

---

## 🎯 Funcionalidades por Perfil

### 👨‍💼 Para Síndicos

| Funcionalidade | Status | Descrição |
|---------------|--------|-----------|
| ✅ Dashboard Completo | ✅ | Visão geral de todas as funcionalidades |
| ✅ Gestão Financeira | ✅ | Controle de receitas, despesas e saldo |
| ✅ Envio de Mensagens | ✅ | Comunicação com todos os moradores |
| ✅ Gestão de Chamados | ✅ | Visualização e resolução de chamados |
| ✅ Configurações | ✅ | Ajustes pessoais e preferências |

### 👤 Para Moradores

| Funcionalidade | Status | Descrição |
|---------------|--------|-----------|
| ✅ Dashboard Personalizado | ✅ | Visão adaptada às necessidades do morador |
| ✅ Finanças Pessoais | ✅ | Visualização de taxas e pagamentos |
| ✅ Recebimento de Mensagens | ✅ | Comunicações do síndico |
| ✅ Abertura de Chamados | ✅ | Solicitação de manutenção |
| ✅ Configurações | ✅ | Ajustes pessoais |

---

## 📝 Scripts Disponíveis

### 🎯 Scripts da Raiz

| Script | Comando | Descrição |
|--------|---------|-----------|
| 📦 `install:all` | `npm run install:all` | Instala todas as dependências |
| 🚀 `dev` | `npm run dev` | Inicia front-end e back-end simultaneamente |
| 🎨 `dev:frontend` | `npm run dev:frontend` | Inicia apenas o front-end |
| ⚙️ `dev:backend` | `npm run dev:backend` | Inicia apenas o back-end |
| 🏗️ `build:frontend` | `npm run build:frontend` | Gera build de produção do front-end |
| 🏭 `start:backend` | `npm run start:backend` | Inicia servidor de produção do back-end |

### 📂 Scripts do Front-end (`frontend/`)

| Script | Comando | Descrição |
|--------|---------|-----------|
| 🛠️ `dev` | `npm run dev` | Servidor de desenvolvimento |
| 🏗️ `build` | `npm run build` | Build de produção |

### 📂 Scripts do Back-end (`backend/`)

| Script | Comando | Descrição |
|--------|---------|-----------|
| 🛠️ `dev` | `npm run dev` | Servidor com nodemon (auto-reload) |
| 🏭 `start` | `npm start` | Servidor de produção |

---

## 🔧 Configuração

### 🔐 Variáveis de Ambiente

Crie um arquivo `.env` na pasta `backend/`:

```env
# Porta do servidor
PORT=5000

# Segredo para JWT (IMPORTANTE: Mude em produção!)
JWT_SECRET=domus_secret_key_2024_tcc
```

> ⚠️ **IMPORTANTE**: Em produção, use um segredo JWT forte e seguro!

---

## 🔐 Credenciais de Teste

Após iniciar o sistema, você pode:

1. 📝 Criar uma conta através da página de cadastro
2. 🔑 Fazer login com suas credenciais
3. 🎉 Começar a usar o sistema!

---

## 📞 Suporte e Ajuda

### 🆘 Problemas Comuns

| Problema | Solução |
|----------|---------|
| ❌ Erro ao instalar dependências | Execute `npm run install:all` novamente |
| ❌ Porta já em uso | Altere a porta no `.env` ou `webpack.config.js` |
| ❌ Erro de conexão com API | Verifique se o back-end está rodando na porta 5000 |
| ❌ Token inválido | Faça logout e login novamente |

### 📖 Mais Informações

1. 📚 Consulte a documentação específica (front-end ou back-end)
2. 🔍 Verifique os logs do servidor
3. ✅ Confirme que todas as dependências estão instaladas

---

## 🎓 Informações do TCC

Este projeto foi desenvolvido como **Trabalho de Conclusão de Curso (TCC)** por alunos de Tecnologia da Informação.

### ✨ Características do Projeto

- ✅ **Código Comentado**: Explicações didáticas em cada parte
- ✅ **Estrutura Profissional**: Organização clara e intuitiva
- ✅ **Documentação Completa**: Guias detalhados para desenvolvedores
- ✅ **Autenticação JWT**: Sistema seguro de autenticação
- ✅ **Interface Responsiva**: Adaptável a diferentes telas
- ✅ **Separação de Código**: Front-end e back-end completamente separados

---

## 📄 Licença

Este projeto foi desenvolvido para **fins acadêmicos**.

---

<div align="center">

### 🎉 Desenvolvido com ❤️ para o TCC

**Sistema DOMUS - Gestão de Condomínios**

---

⭐ **Se este projeto foi útil, considere dar uma estrela!** ⭐

</div>
