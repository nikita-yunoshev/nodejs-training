const knex = require('../knex/knex.js');

const getUsers = () => knex.table('users').select('*');

module.exports = getUsers;
