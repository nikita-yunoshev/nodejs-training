const environment = process.env.ENVIRONMENT || 'development';
const config = require('../../knexconfig.js')[environment];

module.exports = require('knex')(config);
