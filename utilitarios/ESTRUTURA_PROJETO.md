# 📁 Estrutura Completa do Projeto DOMUS

<div align="center">

![Structure](https://img.shields.io/badge/Estrutura-Projeto%20Organizado-blue?style=for-the-badge)

**Detalhamento completo da organização do projeto**

</div>

---

## 🎯 Organização

O projeto está dividido em **2 pastas principais** com separação clara de responsabilidades:

```
TCC Domus/
│
├── 📂 frontend/              # Front-end React + SASS
│   ├── src/
│   │   ├── components/      # Componentes React (.jsx + .scss)
│   │   ├── routes/          # Rotas React Router
│   │   ├── services/        # Serviços de API (axios)
│   │   ├── styles/          # Estilos globais SCSS
│   │   └── index.js         # Ponto de entrada
│   ├── public/              # Arquivos estáticos (HTML, assets)
│   ├── package.json         # Dependências do front-end
│   ├── src/setupProxy.js   # Configuração do proxy para API
│   └── README.md            # Documentação do front-end
│
├── 📂 backend/              # Back-end Node.js + Express
│   ├── src/
│   │   ├── controllers/    # Lógica de negócio
│   │   ├── routes/          # Rotas da API REST
│   │   ├── middlewares/     # Middlewares (JWT, auth)
│   │   ├── config/          # Configurações (DB, etc)
│   │   └── server.js        # Servidor principal
│   ├── data/                # Banco de dados JSON
│   │   └── db.json          # Arquivo de dados
│   ├── package.json         # Dependências do back-end
│   ├── .env                 # Variáveis de ambiente
│   └── README.md            # Documentação do back-end
│
└── 📄 Arquivos Raiz
    ├── README.md                    # Documentação principal
    ├── DOCUMENTACAO_FRONTEND_DOMUS.md
    ├── DOCUMENTACAO_BACKEND_DOMUS.md
    ├── INSTRUCOES_RAPIDAS.md        # Guia rápido
    ├── ESTRUTURA_PROJETO.md         # Este arquivo
    ├── package.json                 # Scripts de orquestração
    └── .gitignore                   # Arquivos ignorados pelo Git
```

---

## 🔍 Detalhamento

### 🎨 Front-end (`frontend/`)

#### 📦 Componentes React

| Componente | Arquivo | Descrição |
|-----------|---------|-----------|
| 🔐 Login | `Login.jsx` / `Login.scss` | Página de login |
| 📝 Cadastro | `Cadastro.jsx` / `Cadastro.scss` | Página de cadastro |
| 🏠 Dashboard Síndico | `Home.jsx` / `Home.scss` | Dashboard principal |
| 👤 Dashboard Morador | `HomeMorador.jsx` | Dashboard do morador |
| 💰 Finanças Síndico | `Financas.jsx` / `Financas.scss` | Gestão financeira |
| 💰 Finanças Morador | `FinancasMorador.jsx` | Finanças pessoais |
| 💬 Mensagens Síndico | `Mensagens.jsx` / `Mensagens.scss` | Sistema de mensagens |
| 💬 Mensagens Morador | `MensagensMorador.jsx` | Mensagens recebidas |
| 🔧 Chamados Síndico | `Chamados.jsx` / `Chamados.scss` | Gestão de chamados |
| 🔧 Chamados Morador | `ChamadosMorador.jsx` | Meus chamados |
| 📄 Sobre | `Sobre.jsx` / `Sobre.scss` | Página sobre |
| ⚙️ Configurações | `Settings.jsx` / `Settings.scss` | Configurações |
| 🏡 Início | `Inicio.jsx` / `Inicio.scss` | Página inicial |
| 📋 Sidebar | `Sidebar.jsx` / `Sidebar.scss` | Barra lateral |
| 👤 Header | `Header.jsx` / `Header.scss` | Cabeçalho |

#### 🔌 Serviços

| Serviço | Arquivo | Descrição |
|---------|---------|-----------|
| 📡 API | `api.js` | Configuração do axios e serviços |

#### 🛣️ Rotas

| Rota | Arquivo | Descrição |
|------|---------|-----------|
| 🛣️ Router | `AppRouter.jsx` | Configuração de todas as rotas |

#### 🎨 Estilos

| Estilo | Arquivo | Descrição |
|--------|---------|-----------|
| 🌐 Global | `global.scss` | Estilos globais e variáveis |

---

### ⚙️ Back-end (`backend/`)

#### 🎮 Controllers

| Controller | Arquivo | Descrição |
|------------|---------|-----------|
| 🔐 Autenticação | `AuthController.js` | Login e registro |
| 💰 Finanças | `FinancasController.js` | Operações financeiras |
| 💬 Mensagens | `MensagensController.js` | Operações de mensagens |
| 🔧 Chamados | `ChamadosController.js` | Operações de chamados |

#### 🛣️ Routes

| Rota | Arquivo | Endpoint |
|------|---------|----------|
| 🔐 Auth | `authRoutes.js` | `/api/auth` |
| 💰 Finanças | `financasRoutes.js` | `/api/financas` |
| 💬 Mensagens | `mensagensRoutes.js` | `/api/mensagens` |
| 🔧 Chamados | `chamadosRoutes.js` | `/api/chamados` |

#### 🛡️ Middlewares

| Middleware | Arquivo | Descrição |
|------------|---------|-----------|
| 🔒 Autenticação | `auth.js` | JWT e verificação de roles |

#### ⚙️ Config

| Config | Arquivo | Descrição |
|--------|---------|-----------|
| 💾 Banco | `db.js` | Configuração do banco JSON |

---

## 🚀 Como Usar

### 📦 Instalação

```bash
npm run install:all
```

### 🛠️ Desenvolvimento

```bash
npm run dev  # Executa front-end e back-end simultaneamente
```

### 🏭 Produção

```bash
npm run build:frontend  # Build do front-end
npm run start:backend   # Inicia o back-end
```

---

## 📝 Notas Importantes

### ✅ Separação Clara

- 🎨 **Front-end**: Completamente independente
- ⚙️ **Back-end**: API REST separada
- 📦 **Dependências**: Cada pasta tem seu próprio `package.json`

### 🔄 Scripts

- 🎯 Use os scripts da raiz para orquestrar tudo
- 📂 Scripts individuais em cada pasta

### 💾 Banco de Dados

- 📄 JSON local em `backend/data/db.json`
- 🔄 Fácil migração para MySQL/MongoDB

### 🌐 Portas

| Serviço | Porta | URL |
|---------|-------|-----|
| 🟢 Front-end | 3000 | http://localhost:3000 |
| 🔵 Back-end | 5000 | http://localhost:5000 |

---

## 🔄 Fluxo de Dados

```
┌─────────────────┐
│  Front-end      │
│  (React)        │
└────────┬────────┘
         │
         │ (axios)
         ↓
┌─────────────────┐
│  Back-end       │
│  (Express)      │
└────────┬────────┘
         │
         │ (JSON)
         ↓
┌─────────────────┐
│  Banco de Dados │
│  (db.json)      │
└─────────────────┘
```

---

## 📚 Documentação

| Documento | Descrição | Link |
|-----------|-----------|------|
| 📖 **Geral** | Documentação principal | [README.md](README.md) |
| 📖 **Front-end** | Documentação React | [DOCUMENTACAO_FRONTEND_DOMUS.md](DOCUMENTACAO_FRONTEND_DOMUS.md) |
| 📖 **Back-end** | Documentação API | [DOCUMENTACAO_BACKEND_DOMUS.md](DOCUMENTACAO_BACKEND_DOMUS.md) |
| ⚡ **Rápida** | Guia rápido | [INSTRUCOES_RAPIDAS.md](INSTRUCOES_RAPIDAS.md) |

---

<div align="center">

### 🎉 Estrutura organizada para TCC profissional! 🎓

**Sistema DOMUS - Gestão de Condomínios**

---

⭐ **Projeto bem estruturado e documentado!** ⭐

</div>
