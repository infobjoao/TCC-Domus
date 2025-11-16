# TODO: Migrate to React with SASS and Build Express API

## 1. Set up project structure and dependencies
- [ ] Install React, React Router, SASS, Express, MySQL2, JWT, bcrypt, CORS, dotenv
- [ ] Create folders: src/components/, src/routes/, src/services/, src/controllers/, src/services/, src/repositories/, src/middlewares/, src/utils/, src/config/
- [ ] Update package.json scripts for React and Express

## 2. Convert HTML to JSX components
- [ ] Convert login.html to Login.jsx in src/components/
- [ ] Convert cadastro.html to Cadastro.jsx in src/components/
- [ ] Convert home.html to Home.jsx in src/components/
- [ ] Convert other HTML files (finanças.html, mensagens.html, etc.) to JSX components
- [ ] Handle events with React hooks (useState, useEffect)

## 3. Convert CSS to SASS
- [ ] Convert login.css to Login.scss in src/components/
- [ ] Convert cadastro.css to Cadastro.scss in src/components/
- [ ] Convert home.css to Home.scss in src/components/
- [ ] Convert other CSS files to SCSS
- [ ] Update imports in JSX components

## 4. Implement routing
- [ ] Create src/routes/AppRouter.jsx with React Router setup
- [ ] Define routes: /login, /cadastro, /home, etc.
- [ ] Implement protected routes for authenticated users

## 5. Build backend API
- [ ] Set up Express server in src/server.js
- [ ] Create AuthController in src/controllers/
- [ ] Create AuthService in src/services/
- [ ] Create UserRepository in src/repositories/
- [ ] Create auth middleware for JWT in src/middlewares/
- [ ] Create JWT utils in src/utils/
- [ ] Create DB config in src/config/

## 6. Integrate frontend with API
- [ ] Create authService.js in src/services/ for API calls
- [ ] Replace localStorage logic in components with API calls
- [ ] Handle login/register forms with API

## 7. Database setup
- [ ] Create MySQL database schema for users
- [ ] Run migrations or scripts to create tables

## 8. Testing
- [ ] Run Express server
- [ ] Run React app
- [ ] Test login flow, routing, API responses
