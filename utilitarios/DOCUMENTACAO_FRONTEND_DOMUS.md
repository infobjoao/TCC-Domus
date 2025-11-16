# 📚 Documentação Front-end DOMUS

<div align="center">

![React](https://img.shields.io/badge/React-18.2.0-blue?style=for-the-badge&logo=react)
![SASS](https://img.shields.io/badge/SASS-SCSS-pink?style=for-the-badge&logo=sass)
![Create React App](https://img.shields.io/badge/CRA-5.0.1-blue?style=for-the-badge&logo=react)

**Documentação completa do front-end do sistema DOMUS**

</div>

---

## 🎯 Visão Geral

O front-end do sistema DOMUS foi desenvolvido em **React** com **SASS (SCSS)** para estilização. O projeto mantém a identidade visual original, com cores azuis e layout limpo, adequado para um sistema de gestão de condomínios.

### 🎨 Características Principais

- ⚛️ **React 18.2.0** - Biblioteca moderna para interfaces
- 🎨 **SASS/SCSS** - Pré-processador CSS poderoso
- 🛣️ **React Router** - Navegação entre páginas
- 📡 **Axios** - Comunicação com a API
- 🚀 **Create React App** - Ferramenta para criação e configuração do projeto

---

## 📁 Estrutura de Pastas

```
frontend/
│
├── 📂 src/
│   ├── 📂 components/          # Componentes React reutilizáveis
│   │   ├── 🔐 Login.jsx        # Página de login
│   │   ├── 📝 Cadastro.jsx     # Página de cadastro
│   │   ├── 🏠 Home.jsx         # Dashboard do síndico
│   │   ├── 👤 HomeMorador.jsx  # Dashboard do morador
│   │   ├── 💰 Financas.jsx     # Finanças (síndico)
│   │   ├── 💰 FinancasMorador.jsx # Finanças (morador)
│   │   ├── 💬 Mensagens.jsx    # Mensagens (síndico)
│   │   ├── 💬 MensagensMorador.jsx # Mensagens (morador)
│   │   ├── 🔧 Chamados.jsx     # Chamados (síndico)
│   │   ├── 🔧 ChamadosMorador.jsx # Chamados (morador)
│   │   ├── 📄 Sobre.jsx        # Página sobre o sistema
│   │   ├── ⚙️ Settings.jsx     # Configurações do usuário
│   │   ├── 🏡 Inicio.jsx       # Página inicial pública
│   │   ├── 📋 Sidebar.jsx      # Barra lateral de navegação
│   │   └── 👤 Header.jsx       # Cabeçalho com menu de perfil
│   │
│   ├── 📂 services/            # Serviços de API
│   │   └── 📡 api.js           # Configuração do axios e serviços
│   │
│   ├── 📂 routes/              # Configuração de rotas
│   │   └── 🛣️ AppRouter.jsx    # Router principal
│   │
│   ├── 📂 styles/              # Estilos SCSS globais
│   │   └── 🎨 global.scss      # Estilos globais e variáveis
│   │
│   └── 📄 index.js             # Ponto de entrada da aplicação
│
├── 📂 public/                  # Arquivos estáticos
│   ├── 📂 assets/              # Imagens, ícones e logos
│   └── 📄 index.html           # HTML principal
│
├── 📄 package.json             # Dependências do projeto
└── 📄 setupProxy.js            # Configuração do proxy para API
```

---

## 🧩 Componentes Principais

### 🔐 Autenticação

#### **Login.jsx** 🔑

**Função**: Página de autenticação do sistema

**Funcionalidades**:
- ✅ Validação de credenciais
- ✅ Redirecionamento baseado no tipo de usuário
- ✅ Armazenamento de token JWT no localStorage
- ✅ Tratamento de erros

**Arquivo de Estilo**: `Login.scss`

---

#### **Cadastro.jsx** 📝

**Função**: Registro de novos usuários

**Funcionalidades**:
- ✅ Validação de formulário
- ✅ Escolha entre síndico ou morador
- ✅ Verificação de senha
- ✅ Feedback visual

**Arquivo de Estilo**: `Cadastro.scss`

---

### 🏠 Dashboards

#### **Home.jsx** 👨‍💼 (Síndico)

**Função**: Dashboard principal do síndico

**Componentes usados**: 
- `Sidebar` - Navegação lateral
- `Header` - Cabeçalho com perfil

**Funcionalidades**:
- 📊 Cards de acesso rápido
- 🔗 Links para principais funcionalidades
- 📈 Visão geral do sistema

**Arquivo de Estilo**: `Home.scss`

---

#### **HomeMorador.jsx** 👤 (Morador)

**Função**: Dashboard principal do morador

**Diferenças**: 
- Links adaptados para permissões de morador
- Visualização personalizada

**Arquivo de Estilo**: `Home.scss` (compartilhado)

---

### 💰 Finanças

#### **Financas.jsx** 💵 (Síndico)

**Função**: Gestão financeira completa do condomínio

**Funcionalidades**:
- 📊 Visualização de receitas, despesas e saldo
- 📋 Tabela de transações
- 💳 Cards de resumo financeiro
- 📈 Gráficos e estatísticas

**Arquivo de Estilo**: `Financas.scss`

---

#### **FinancasMorador.jsx** 💳 (Morador)

**Função**: Visualização das próprias finanças

**Funcionalidades**:
- 💵 Total devido e pago
- 📜 Histórico de transações pessoais
- 📊 Visualização simplificada

**Arquivo de Estilo**: `Financas.scss` (compartilhado)

---

### 💬 Mensagens

#### **Mensagens.jsx** 📨 (Síndico)

**Função**: Sistema de comunicação

**Funcionalidades**:
- ✉️ Envio de mensagens para moradores
- 📥 Visualização de mensagens recebidas
- 📝 Formulário de envio
- 🎯 Seleção de destinatários

**Arquivo de Estilo**: `Mensagens.scss`

---

#### **MensagensMorador.jsx** 📬 (Morador)

**Função**: Visualização de mensagens recebidas

**Funcionalidades**:
- 📋 Lista de mensagens do síndico
- 👁️ Visualização de conteúdo
- 📅 Data e hora das mensagens

**Arquivo de Estilo**: `Mensagens.scss` (compartilhado)

---

### 🔧 Chamados

#### **Chamados.jsx** 🛠️ (Síndico)

**Função**: Gestão de chamados de manutenção

**Funcionalidades**:
- 👀 Visualização de todos os chamados
- ✅ Resolução de chamados
- 🔍 Filtros por prioridade
- 📊 Status dos chamados

**Arquivo de Estilo**: `Chamados.scss`

---

#### **ChamadosMorador.jsx** 🔨 (Morador)

**Função**: Criação e acompanhamento de chamados

**Funcionalidades**:
- ➕ Abertura de novos chamados
- 👁️ Acompanhamento de status
- 🎯 Seleção de prioridade
- 📝 Descrição detalhada

**Arquivo de Estilo**: `Chamados.scss` (compartilhado)

---

### 🧱 Componentes Reutilizáveis

#### **Sidebar.jsx** 📋

**Função**: Barra lateral de navegação

**Props**: 
- `userRole` (sindico/morador)

**Características**:
- 🔗 Links dinâmicos baseados no tipo de usuário
- 🎨 Ícones e labels
- 📱 Link para Instagram
- 🎯 Navegação intuitiva

**Arquivo de Estilo**: `Sidebar.scss`

---

#### **Header.jsx** 👤

**Função**: Cabeçalho com menu de perfil

**Props**: 
- `userName` - Nome do usuário

**Funcionalidades**:
- 📋 Dropdown de perfil
- ⚙️ Acesso a configurações
- 🚪 Logout
- 👤 Informações do usuário

**Arquivo de Estilo**: `Header.scss`

---

## 🎨 Estilização (SASS/SCSS)

### 🎨 Variáveis de Cores

```scss
// Cores principais do sistema
$primary-blue: #0168ad;           // Azul principal
$primary-dark-blue: rgb(0, 0, 151); // Azul escuro
$primary-light-blue: #0274ff;     // Azul claro
$background-gray: rgb(247, 247, 247); // Fundo cinza
```

### 📄 Arquivos SCSS

| Arquivo | Descrição | Localização |
|---------|-----------|-------------|
| `global.scss` | Estilos globais e reset CSS | `src/styles/` |
| `Login.scss` | Estilos da página de login | `src/components/` |
| `Cadastro.scss` | Estilos da página de cadastro | `src/components/` |
| `Home.scss` | Estilos dos dashboards | `src/components/` |
| `Financas.scss` | Estilos da página de finanças | `src/components/` |
| `Mensagens.scss` | Estilos da página de mensagens | `src/components/` |
| `Chamados.scss` | Estilos da página de chamados | `src/components/` |
| `Sobre.scss` | Estilos da página sobre | `src/components/` |
| `Settings.scss` | Estilos da página de configurações | `src/components/` |
| `Sidebar.scss` | Estilos da barra lateral | `src/components/` |
| `Header.scss` | Estilos do cabeçalho | `src/components/` |

---

## 🔌 Serviços de API

### 📡 **api.js**

Centraliza todas as chamadas à API do back-end.

#### 🛠️ Serviços Disponíveis

| Serviço | Descrição | Métodos |
|---------|-----------|---------|
| `authService` | Login e registro | `login()`, `register()` |
| `financasService` | Operações financeiras | `getAll()`, `getMorador()`, `create()`, `update()`, `delete()` |
| `mensagensService` | Operações de mensagens | `getAll()`, `getMorador()`, `create()`, `delete()` |
| `chamadosService` | Operações de chamados | `getAll()`, `getMorador()`, `create()`, `resolve()`, `delete()` |

#### ⚙️ Configuração

- **Base URL**: `/api`
- **Interceptor**: Adiciona token JWT automaticamente
- **Tratamento de Erros**: Redireciona para login em caso de 401

---

## 🛣️ Rotas

### 🌐 Rotas Públicas

| Rota | Componente | Descrição |
|------|------------|-----------|
| `/` | `Inicio` | Página inicial pública |
| `/login` | `Login` | Página de login |
| `/cadastro` | `Cadastro` | Página de cadastro |

### 🔒 Rotas Privadas (Síndico)

| Rota | Componente | Descrição |
|------|------------|-----------|
| `/home` | `Home` | Dashboard principal |
| `/financas` | `Financas` | Gestão financeira |
| `/mensagens` | `Mensagens` | Sistema de mensagens |
| `/chamados` | `Chamados` | Gestão de chamados |
| `/sobre` | `Sobre` | Sobre o sistema |
| `/settings` | `Settings` | Configurações |

### 🔒 Rotas Privadas (Morador)

| Rota | Componente | Descrição |
|------|------------|-----------|
| `/home-morador` | `HomeMorador` | Dashboard principal |
| `/financas-morador` | `FinancasMorador` | Finanças pessoais |
| `/mensagens-morador` | `MensagensMorador` | Mensagens recebidas |
| `/chamados-morador` | `ChamadosMorador` | Meus chamados |
| `/sobre` | `Sobre` | Sobre o sistema |
| `/settings` | `Settings` | Configurações |

---

## ⚙️ Tecnologias Utilizadas

| Tecnologia | Versão | Descrição |
|------------|--------|-----------|
| ⚛️ **React** | 18.2.0 | Biblioteca JavaScript para interfaces |
| 🛣️ **React Router DOM** | 6.20.0 | Roteamento entre páginas |
| 📡 **Axios** | 1.6.2 | Cliente HTTP para API |
| 🎨 **SASS/SCSS** | 1.69.5 | Pré-processador CSS |
| 🚀 **Create React App** | 5.0.1 | Ferramenta de criação e configuração |

---

## 🚀 Como Executar

### 📦 Instalação

```bash
cd frontend
npm install
```

### 🛠️ Desenvolvimento

```bash
npm start
```

> 🌐 Acesse: `http://localhost:3000`

### 🏗️ Build para Produção

```bash
npm run build
```

> 📦 Os arquivos serão gerados na pasta `build/`

---

## 📝 Observações Importantes

### 🔐 Autenticação

- ✅ O token JWT é armazenado no `localStorage`
- ✅ Token é enviado automaticamente em todas as requisições
- ✅ Redirecionamento automático em caso de token inválido

### 📱 Responsividade

- ✅ Layout responsivo
- ✅ Otimizado para desktop
- ✅ Adaptável a diferentes tamanhos de tela

### 🎨 Design

- ✅ Mantém a identidade visual original
- ✅ Cores azuis características do projeto
- ✅ Interface limpa e profissional

### 💬 Comentários

- ✅ Todos os componentes têm comentários explicativos
- ✅ Código didático e fácil de entender
- ✅ Documentação inline

---

## 🎓 Para Desenvolvedores

### ➕ Adicionar Novo Componente

1. 📝 Crie o arquivo `.jsx` em `src/components/`
2. 🎨 Crie o arquivo `.scss` correspondente
3. 🛣️ Adicione a rota em `AppRouter.jsx`
4. 📦 Importe e use onde necessário

### 🔌 Adicionar Nova Rota de API

1. 📡 Adicione o método em `src/services/api.js`
2. 🎯 Use o serviço no componente necessário
3. ⚠️ Trate erros adequadamente

---

## 📞 Suporte

Para dúvidas ou problemas:

1. 📚 Consulte a documentação do back-end
2. 🔍 Verifique os logs do console
3. 💬 Entre em contato com a equipe de desenvolvimento

---

<div align="center">

### 🎉 Desenvolvido como Trabalho de Conclusão de Curso (TCC)

**Sistema DOMUS - Gestão de Condomínios**

---

⭐ **Front-end moderno e profissional!** ⭐

</div>
