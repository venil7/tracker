const express = require('express');
const app = express();
const jwt = require('express-jwt');
const jwtAuthz = require('express-jwt-authz');
const jwksRsa = require('jwks-rsa');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config({ silent: true });

if (!process.env.REACT_APP_DOMAIN || !process.env.REACT_APP_AUDIENCE) {
  throw 'Make sure you have REACT_APP_DOMAIN, and REACT_APP_AUDIENCE in your .env file';
}

app.use(cors());
app.use(
  morgan(
    'API Request (port 3001): :method :url :status :response-time ms - :res[content-length]'
  )
);

const checkJwt = jwt({
  // Dynamically provide a signing key based on the kid in the header and the singing keys provided by the JWKS endpoint.
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.REACT_APP_DOMAIN}/.well-known/jwks.json`
  }),

  // Validate the audience and the issuer.
  audience: process.env.REACT_APP_AUDIENCE,
  issuer: `https://${process.env.REACT_APP_DOMAIN}/`,
  algorithms: ['RS256']
});

const checkScopes = jwtAuthz(['api']);

app.get('/api/public', function(req, res) {
  res.json({
    message:
      "Hello from a public endpoint! You don't need to be authenticated to see this."
  });
});

app.get('/api/private', checkJwt, checkScopes, (req, res) =>
  res.json({ message: 'Hello from a private endpoint!' })
);

app.listen(3001);
console.log('Server listening on http://localhost:3001');
