const morgan = require('morgan');
const LOG_FORMAT =
  ':method :url :status :response-time ms - :res[content-length]';

module.exports = () => morgan(LOG_FORMAT);
