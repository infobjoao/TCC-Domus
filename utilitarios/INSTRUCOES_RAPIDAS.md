# ⚡ Instruções Rápidas - DOMUS

<div align="center">

![Quick Start](https://img.shields.io/badge/Quick%20Start-Guia%20Rápido-orange?style=for-the-badge)

**Guia rápido para começar a usar o sistema DOMUS**

</div>

---

## 🚀 Início Rápido

### 1️⃣ Instalação Completa

```bash
npm run install:all 
```

> ⏱️ Isso instalará todas as dependências do front-end e back-end automaticamente!

---

### 2️⃣ Executar o Sistema

#### **Opção A: Tudo de uma vez** ⭐ (Recomendado)

```bash
npm run dev
```

> 🎉 Isso iniciará automaticamente:
> - 🔵 Back-end na porta **5000**
> - 🟢 Front-end na porta **3000**

---

#### **Opção B: Separadamente**

**Terminal 1 - Back-end:**
```bash
npm run dev:backend
```

**Terminal 2 - Front-end:**
```bash
npm run dev:frontend
```

---

### 3️⃣ Acessar

| Serviço | URL | Descrição |
|---------|-----|-----------|
| 🌐 **Front-end** | http://localhost:3000 | Interface do sistema |
| 🔵 **Back-end API** | http://localhost:5000 | API REST |

---

## 📋 Estrutura de Pastas

```
TCC Domus/
│
├── 📂 frontend/          # Todo código React
├── 📂 backend/           # Todo código Node.js
├── 📄 README.md          # Documentação principal
└── 📄 package.json       # Scripts de orquestração
```

---

## 🔧 Configuração Inicial

### 1️⃣ Back-end

Crie o arquivo `backend/.env`:

```env
PORT=5000
JWT_SECRET=domus_secret_key_2024_tcc
```

### 2️⃣ Instalar Dependências

```bash
npm run install:all
```

---

## 📚 Documentação Completa

| Documento | Link |
|-----------|------|
| 📖 **Front-end** | [DOCUMENTACAO_FRONTEND_DOMUS.md](DOCUMENTACAO_FRONTEND_DOMUS.md) |
| 📖 **Back-end** | [DOCUMENTACAO_BACKEND_DOMUS.md](DOCUMENTACAO_BACKEND_DOMUS.md) |
| 📄 **README Principal** | [README.md](README.md) |

---

## ⚠️ Importante

### ✅ Checklist de Inicialização

- [ ] ✅ Node.js instalado (versão 14+)
- [ ] ✅ Dependências instaladas (`npm run install:all`)
- [ ] ✅ Arquivo `.env` criado no backend
- [ ] ✅ Back-end rodando na porta 5000
- [ ] ✅ Front-end rodando na porta 3000

### 📝 Notas

- 🔴 O back-end **deve estar rodando** antes do front-end
- 💡 Use `npm run dev` para executar ambos simultaneamente
- 💾 O banco de dados é um arquivo JSON em `backend/data/db.json`

---

## 🐛 Problemas Comuns

### ❌ Erro ao Instalar Dependências

**Solução:**
```bash
# Limpe o cache e reinstale
rm -rf node_modules frontend/node_modules backend/node_modules
npm run install:all
```

---

### ❌ Porta Já em Uso

**Solução:**
- Altere a porta no `backend/.env` (PORT=5001)
- Ou altere a porta no arquivo `.env` do frontend (PORT=3001)

---

### ❌ Erro de Conexão com API

**Solução:**
1. ✅ Verifique se o back-end está rodando na porta 5000
2. ✅ Verifique o proxy no `frontend/src/setupProxy.js`
3. ✅ Confirme que o CORS está habilitado no back-end

---

### ❌ Token Inválido

**Solução:**
1. 🔐 Faça logout
2. 🔑 Faça login novamente
3. ✅ Verifique se o JWT_SECRET está correto

---

## 🎯 Comandos Úteis

| Comando | Descrição |
|---------|-----------|
| `npm run install:all` | Instala todas as dependências |
| `npm run dev` | Inicia tudo simultaneamente |
| `npm run dev:frontend` | Apenas front-end |
| `npm run dev:backend` | Apenas back-end |
| `npm run build:frontend` | Build de produção |

---

## 📞 Precisa de Ajuda?

1. 📚 Consulte a documentação completa
2. 🔍 Verifique os logs do servidor
3. 💬 Entre em contato com a equipe

---

<div align="center">

### 🎉 Pronto para começar!

**Sistema DOMUS - Gestão de Condomínios**

---

⭐ **Boa sorte com seu TCC!** ⭐

</div>
