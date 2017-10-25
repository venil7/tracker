import * as jwt from 'express-jwt';
import * as jwtAuthz from 'express-jwt-authz';
import * as jwksRsa from 'jwks-rsa';

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

export { checkJwt, checkScopes };
