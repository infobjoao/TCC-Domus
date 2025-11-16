# 📚 Documentação Back-end DOMUS

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-Express-green?style=for-the-badge&logo=node.js)
![JWT](https://img.shields.io/badge/JWT-Authentication-red?style=for-the-badge)
![Express](https://img.shields.io/badge/Express-4.18.2-black?style=for-the-badge&logo=express)

**Documentação completa do back-end do sistema DOMUS**

</div>

---

## 🎯 Visão Geral

O back-end do sistema DOMUS foi desenvolvido em **Node.js** com **Express** e utiliza **JWT** para autenticação. O sistema usa um arquivo JSON local para simular um banco de dados, simplificando a implementação para o TCC.

### 🎨 Características Principais

- 🟢 **Node.js** - Runtime JavaScript
- 🚀 **Express 4.18.2** - Framework web rápido
- 🔐 **JWT** - Autenticação segura com tokens
- 🔒 **bcryptjs** - Criptografia de senhas
- 📄 **JSON** - Banco de dados simulado (fácil migração)

---

## 📁 Estrutura de Pastas

```
backend/
│
├── 📂 src/
│   ├── 📂 controllers/        # Lógica de negócio das rotas
│   │   ├── 🔐 AuthController.js      # Autenticação (login/registro)
│   │   ├── 💰 FinancasController.js  # Operações financeiras
│   │   ├── 💬 MensagensController.js # Operações de mensagens
│   │   └── 🔧 ChamadosController.js # Operações de chamados
│   │
│   ├── 📂 routes/             # Definição das rotas
│   │   ├── 🛣️ authRoutes.js    # Rotas de autenticação
│   │   ├── 🛣️ financasRoutes.js # Rotas de finanças
│   │   ├── 🛣️ mensagensRoutes.js # Rotas de mensagens
│   │   └── 🛣️ chamadosRoutes.js # Rotas de chamados
│   │
│   ├── 📂 middlewares/        # Middlewares personalizados
│   │   └── 🔒 auth.js         # Autenticação JWT e verificação de roles
│   │
│   ├── 📂 config/             # Configurações
│   │   └── 💾 db.js           # Configuração do banco de dados (JSON)
│   │
│   └── 🚀 server.js           # Arquivo principal do servidor
│
├── 📂 data/                   # Dados do banco (JSON)
│   └── 📄 db.json            # Arquivo que simula o banco de dados
│
├── 📄 package.json           # Dependências do projeto
└── 🔐 .env                   # Variáveis de ambiente
```

---

## 🔐 Autenticação JWT

### 🔄 Como Funciona

```
1. 📝 Registro/Login → Usuário se autentica
2. 🎫 Recebe Token → Token JWT é gerado
3. 📡 Requisições → Token enviado no header
4. ✅ Validação → Middleware verifica o token
5. 🎯 Permissões → Verificação de roles (sindico/morador)
```

### 🛡️ Middleware de Autenticação

```javascript
// Exemplo de uso básico
router.get('/rota-protegida', authenticateToken, controller.funcao);
```

### 👥 Verificação de Roles

```javascript
// Apenas síndicos podem acessar
router.post('/criar', authenticateToken, requireSindico, controller.criar);

// Apenas moradores podem acessar
router.get('/meus-dados', authenticateToken, requireMorador, controller.get);
```

---

## 🛣️ Rotas da API

### 🔑 Autenticação (`/api/auth`)

#### 📝 `POST /api/auth/register`

Registra um novo usuário no sistema.

**📥 Body:**
```json
{
  "name": "João Silva",
  "email": "joao@email.com",
  "password": "senha123",
  "role": "sindico"  // ou "morador"
}
```

**📤 Resposta (201):**
```json
{
  "message": "Usuário cadastrado com sucesso",
  "user": {
    "id": 1,
    "name": "João Silva",
    "email": "joao@email.com",
    "role": "sindico"
  }
}
```

---

#### 🔐 `POST /api/auth/login`

Faz login e retorna token JWT.

**📥 Body:**
```json
{
  "email": "joao@email.com",
  "password": "senha123"
}
```

**📤 Resposta (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "role": "sindico",
  "name": "João Silva",
  "email": "joao@email.com"
}
```

---

### 💰 Finanças (`/api/financas`)

> ⚠️ **Todas as rotas exigem autenticação!**

#### 📊 `GET /api/financas` (Síndico)

Busca todas as finanças do condomínio.

**📤 Resposta:**
```json
{
  "receitas": 10000,
  "despesas": 5000,
  "saldo": 5000,
  "transacoes": [
    {
      "id": 1,
      "descricao": "Taxa Condomínio",
      "valor": 500,
      "tipo": "receita",
      "data": "2023-10-01T10:00:00.000Z"
    }
  ]
}
```

---

#### 👤 `GET /api/financas/morador` (Morador)

Busca finanças do morador logado.

**📤 Resposta:**
```json
{
  "totalDevido": 500,
  "totalPago": 300,
  "saldo": 200,
  "transacoes": [...]
}
```

---

#### ➕ `POST /api/financas` (Síndico)

Cria nova transação financeira.

**📥 Body:**
```json
{
  "descricao": "Taxa Condomínio",
  "valor": 500,
  "tipo": "receita",  // ou "despesa"
  "data": "2023-10-01"
}
```

---

#### ✏️ `PUT /api/financas/:id` (Síndico)

Atualiza uma transação existente.

---

#### 🗑️ `DELETE /api/financas/:id` (Síndico)

Deleta uma transação.

---

### 💬 Mensagens (`/api/mensagens`)

> ⚠️ **Todas as rotas exigem autenticação!**

#### 📋 `GET /api/mensagens` (Síndico)

Busca todas as mensagens do sistema.

---

#### 👤 `GET /api/mensagens/morador` (Morador)

Busca mensagens do morador logado.

---

#### ➕ `POST /api/mensagens` (Síndico)

Cria nova mensagem.

**📥 Body:**
```json
{
  "destinatario": "all",  // ou "sindico"
  "assunto": "Reunião Extraordinária",
  "mensagem": "Haverá uma reunião amanhã às 19h."
}
```

---

#### 🗑️ `DELETE /api/mensagens/:id` (Síndico)

Deleta uma mensagem.

---

### 🔧 Chamados (`/api/chamados`)

> ⚠️ **Todas as rotas exigem autenticação!**

#### 📋 `GET /api/chamados` (Síndico)

Busca todos os chamados do sistema.

---

#### 👤 `GET /api/chamados/morador` (Morador)

Busca chamados do morador logado.

---

#### ➕ `POST /api/chamados` (Todos)

Cria novo chamado de manutenção.

**📥 Body:**
```json
{
  "titulo": "Problema no Elevador",
  "descricao": "Elevador parou no 5º andar.",
  "prioridade": "alta"  // "baixa", "media" ou "alta"
}
```

---

#### ✅ `PUT /api/chamados/:id/resolve` (Síndico)

Resolve um chamado.

---

#### 🗑️ `DELETE /api/chamados/:id` (Síndico)

Deleta um chamado.

---

## 💾 Banco de Dados (JSON)

### 📄 Estrutura do `db.json`

```json
{
  "users": [
    {
      "id": 1,
      "name": "João Silva",
      "email": "joao@email.com",
      "password": "$2a$10...",  // Hash bcrypt
      "role": "sindico",
      "createdAt": "2023-10-01T10:00:00.000Z"
    }
  ],
  "financas": [
    {
      "id": 1,
      "descricao": "Taxa Condomínio",
      "valor": 500,
      "tipo": "receita",
      "data": "2023-10-01T10:00:00.000Z",
      "createdAt": "2023-10-01T10:00:00.000Z"
    }
  ],
  "mensagens": [
    {
      "id": 1,
      "titulo": "Reunião",
      "remetente": "Síndico",
      "conteudo": "Texto da mensagem",
      "destinatario": "all",
      "data": "2023-10-01T10:00:00.000Z"
    }
  ],
  "chamados": [
    {
      "id": 1,
      "titulo": "Problema no Elevador",
      "descricao": "Descrição do problema",
      "prioridade": "alta",
      "status": "pendente",
      "moradorId": 2,
      "data": "2023-10-01T10:00:00.000Z"
    }
  ]
}
```

---

## 🔒 Segurança

### 🔐 JWT Secret

| Ambiente | Configuração | Importância |
|----------|--------------|-------------|
| 🛠️ **Desenvolvimento** | Usa `'secret'` como padrão | ⚠️ Apenas para testes |
| 🏭 **Produção** | **MUDE O `JWT_SECRET` no `.env`!** | 🔴 **CRÍTICO** |

### 🔑 Senhas

- ✅ Criptografadas com **bcrypt** (10 rounds)
- ✅ Nunca retornadas nas respostas da API
- ✅ Hash seguro e irreversível

### ✅ Validações

- ✅ Todos os campos obrigatórios são validados
- ✅ Tipos de dados são verificados
- ✅ Roles são verificadas antes de operações sensíveis
- ✅ Tratamento de erros completo

---

## ⚙️ Tecnologias Utilizadas

| Tecnologia | Versão | Descrição |
|------------|--------|-----------|
| 🟢 **Node.js** | - | Runtime JavaScript |
| 🚀 **Express** | 4.18.2 | Framework web |
| 🔐 **JWT** | 9.0.2 | Autenticação com tokens |
| 🔒 **bcryptjs** | 2.4.3 | Criptografia de senhas |
| 🌐 **CORS** | 2.8.5 | Permissão de requisições cross-origin |
| ⚙️ **dotenv** | 16.3.1 | Gerenciamento de variáveis de ambiente |

---

## 🚀 Como Executar

### 📦 Instalação

```bash
cd backend
npm install
```

### 🛠️ Desenvolvimento

```bash
npm run dev
```

> 🌐 Servidor iniciará em: `http://localhost:5000`

### 🏭 Produção

```bash
npm start
```

### 🔐 Variáveis de Ambiente

Crie um arquivo `.env` na pasta `backend/`:

```env
# Porta do servidor
PORT=5000

# Segredo para JWT (IMPORTANTE: Mude em produção!)
JWT_SECRET=seu_secret_aqui
```

---

## 📝 Exemplos de Uso

### 🧪 Testando com cURL

#### 🔐 Login

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"joao@email.com","password":"senha123"}'
```

#### ➕ Criar Chamado (com token)

```bash
curl -X POST http://localhost:5000/api/chamados \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  -d '{"titulo":"Teste","descricao":"Descrição","prioridade":"media"}'
```

---

## 🐛 Tratamento de Erros

### 📊 Códigos de Status HTTP

| Código | Significado | Quando Ocorre |
|--------|-------------|---------------|
| ✅ **200** | Sucesso | Operação realizada com sucesso |
| ✅ **201** | Criado | Recurso criado com sucesso |
| ⚠️ **400** | Dados inválidos | Campos obrigatórios faltando |
| 🔒 **401** | Não autenticado | Token inválido ou ausente |
| 🚫 **403** | Acesso negado | Sem permissão para a operação |
| ❌ **404** | Não encontrado | Recurso não existe |
| 💥 **500** | Erro interno | Erro no servidor |

### 📄 Formato de Erro

```json
{
  "message": "Descrição do erro"
}
```

---

## 🔄 Migração para Banco Real

Para migrar de JSON para MySQL/MongoDB:

1. 🔄 Substitua `config/db.js` por conexão real
2. 📝 Adapte os controllers para usar queries SQL/NoSQL
3. 🛣️ Mantenha a mesma estrutura de rotas
4. ✅ Teste todas as funcionalidades

---

## 📞 Suporte

Para dúvidas ou problemas:

1. 🔍 Verifique os logs do servidor
2. ✅ Confirme que o arquivo `data/db.json` existe
3. 🔐 Verifique as variáveis de ambiente
4. 📚 Consulte a documentação do front-end

---

## 🎓 Observações para TCC

### ✨ Características do Projeto

- ✅ **Código Comentado**: Explicações didáticas em cada função
- ✅ **Estrutura Profissional**: Organização clara (MVC)
- ✅ **Padrões de Projeto**: Uso de controllers, routes, middlewares
- ✅ **Autenticação JWT**: Sistema seguro implementado
- ✅ **Validações**: Tratamento completo de erros
- ✅ **Banco Simplificado**: JSON local (fácil migração)

---

<div align="center">

### 🎉 Desenvolvido como Trabalho de Conclusão de Curso (TCC)

**Sistema DOMUS - Gestão de Condomínios**

---

⭐ **Back-end robusto e seguro!** ⭐

</div>
