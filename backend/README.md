# ⚙️ Back-end DOMUS

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-Express-green?style=for-the-badge&logo=node.js)
![JWT](https://img.shields.io/badge/JWT-Authentication-red?style=for-the-badge)

**Back-end do sistema DOMUS desenvolvido em Node.js + Express + JWT**

</div>

---

## 🚀 Como Executar

### 📦 Instalação

```bash
npm install
```

> ⏱️ Instala todas as dependências necessárias

---

### 🛠️ Desenvolvimento

```bash
npm run dev
```

> 🌐 Servidor iniciará em: `http://localhost:5000`

---

### 🏭 Produção

```bash
npm start
```

---

## 📁 Estrutura

```
backend/
│
├── 📂 src/
│   ├── 📂 controllers/  # Controllers
│   ├── 📂 routes/       # Rotas da API
│   ├── 📂 middlewares/  # Middlewares
│   └── 📂 config/       # Configurações
│
├── 📂 data/             # Banco de dados (JSON)
└── 🔐 .env              # Variáveis de ambiente
```

---

## 🔧 Configuração

Crie um arquivo `.env`:

```env
PORT=5000
JWT_SECRET=seu_secret_aqui
```

> ⚠️ **IMPORTANTE**: Mude o JWT_SECRET em produção!

---

## 📚 Documentação Completa

Consulte a documentação completa na raiz do projeto:

👉 **[DOCUMENTACAO_BACKEND_DOMUS.md](../DOCUMENTACAO_BACKEND_DOMUS.md)**

---

<div align="center">

### 🎉 Back-end robusto e seguro!

**Sistema DOMUS - Gestão de Condomínios**

</div>
