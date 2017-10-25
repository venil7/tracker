import * as morgan from 'morgan';
const LOG_FORMAT =
  ':method :url :status :response-time ms - :res[content-length]';

export default () => morgan(LOG_FORMAT);
