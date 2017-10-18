const jwt = require('express-jwt');
const jwtAuthz = require('express-jwt-authz');
const jwksRsa = require('jwks-rsa');

if (!process.env.REACT_APP_DOMAIN || !process.env.REACT_APP_AUDIENCE) {
  throw new Error(
    'Make sure you have REACT_APP_DOMAIN, and REACT_APP_AUDIENCE in your .env file'
  );
}

const checkJwt = jwt({
  // Dynamically provide a signing key based on
  // the kid in the header and the singing keys provided by the JWKS endpoint.
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

module.exports = {
  checkJwt,
  checkScopes
};
