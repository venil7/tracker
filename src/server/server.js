const dotenv = require('dotenv').config({ silent: true });
const express = require('express');
const cors = require('cors');

const NODE_ENV = process.env.NODE_ENV || 'development';
const PRODUCTION = NODE_ENV === 'production';
const PORT = process.env.PORT || (PRODUCTION ? 3000 : 3001);
const proxy = require('http-proxy-middleware');
const { checkJwt, checkScopes } = require('./auth');
const logging = require('./logging');

const app = express();
app.use(cors());
app.use(logging());

if (NODE_ENV === 'production') {
  app.use(express.static('./build'));
}

app.get('/api/private', checkJwt, checkScopes, (req, res) =>
  res.json({ message: 'some private message' })
);

app.use(
  '/api/kraken',
  proxy({
    target: 'https://api.kraken.com',
    changeOrigin: true,
    // logLevel: 'debug',
    pathRewrite: {
      '^/api/kraken': '/0/public' // rewrite path
    }
  })
);

app.listen(PORT);
console.log(`Server running on ${PORT} in ${NODE_ENV} mode`);
