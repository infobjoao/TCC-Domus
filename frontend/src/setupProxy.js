// Arquivo de configuração do proxy para Create React App
// Este arquivo configura o proxy que redireciona requisições /api para o backend
// É necessário instalar http-proxy-middleware como dependência de desenvolvimento

// Importa a função createProxyMiddleware do http-proxy-middleware
const { createProxyMiddleware } = require('http-proxy-middleware');

// Exporta a função de configuração do proxy
// Esta função é chamada automaticamente pelo Create React App
module.exports = function(app) {
  // Configura o proxy para todas as requisições que começam com /api
  app.use(
    '/api',
    // Cria o middleware do proxy
    createProxyMiddleware({
      // URL do servidor backend para onde as requisições serão redirecionadas
      target: 'http://localhost:5000',
      // Muda o origin do header para o target (necessário para alguns servidores)
      changeOrigin: true,
    })
  );
};
