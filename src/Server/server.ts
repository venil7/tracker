import * as dotenv from 'dotenv';
dotenv.config({ silent: true });
import * as express from 'express';
import * as proxy from 'http-proxy-middleware';
import * as cors from 'cors';
import { checkJwt, checkScopes } from './auth';
import { AssetController } from './controllers/assetController';
import logging from './logging';

const { NODE_ENV = 'development' } = process.env;
const PRODUCTION = NODE_ENV === 'production';
const PORT = process.env.PORT || 3030;

const app = express();
app.use(cors());
app.use(logging());

if (NODE_ENV === 'production') {
  app.get('/callback', (req, res) =>
    res.sendFile('./build/index.html', { root: process.cwd() })
  );
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

const assetController = new AssetController();
app.get('/api/asset', checkJwt, checkScopes, assetController.get);

app.listen(PORT);
console.log(`Server running on ${PORT} in ${NODE_ENV} mode`);
