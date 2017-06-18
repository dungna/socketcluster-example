/* istanbul ignore next */

const winston = require('winston');
const path = require('path');
const moment = require('moment');

const logger = new (winston.Logger)({
  transports: [
    // Log info to console
    new (winston.transports.Console)({
      level: 'info',
      name: 'info-console',
      timestamp: () => moment(),
      formatter: options => `[${options.timestamp().format('YYYY-MM-DD HH-mm-ss')}] : ${options.message || ''}`,
    }),
    // Log info to file
    new (winston.transports.File)({
      level: 'info',
      name: 'info-file',
      filename: path.resolve(__dirname, '..', 'log', `info-${moment().format('YYYYMMDD')}.log`),
      timestamp: () => moment(),
      formatter: options => `[${options.timestamp().format('YYYY-MM-DD HH-mm-ss')}] : ${options.message || ''}`,
      json: false,
    }),
    // Log error to console
    new (winston.transports.Console)({
      level: 'error',
      name: 'error-console',
      timestamp: () => moment(),
      formatter: options => `[${options.timestamp().format('YYYY-MM-DD HH-mm-ss')}] : ${options.message || ''}`,
    }),
    // Log error to file
    new (winston.transports.File)({
      level: 'error',
      name: 'error-file',
      filename: path.resolve(__dirname, '..', 'log', `errors-${moment().format('YYYYMMDD')}.log`),
      timestamp: () => moment(),
      formatter: options => `[${options.timestamp().format('YYYY-MM-DD HH-mm-ss')}] : ${options.message || ''}`,
      json: false,
    }),
    new (winston.transports.File)({
      level: 'request',
      name: 'request-log',
      filename: path.resolve(__dirname, '..', 'log', `requests-${moment().format('YYYYMMDD')}.log`),
      timestamp: () => moment(),
      formatter: options => `[${options.timestamp().format('YYYY-MM-DD HH-mm-ss')}] : ${options.message || ''}`,
      json: false,
    }),
  ],
});

module.exports = process.env.NODE_ENV === 'test' ? { info: () => {}, error: () => {} } : logger;
