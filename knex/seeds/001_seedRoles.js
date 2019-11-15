const tableName = 'roles';
const roles = require('./data/roles');

exports.seed = async (knex) => {
  await knex(tableName).del();

  return knex(tableName).insert(roles);
};
