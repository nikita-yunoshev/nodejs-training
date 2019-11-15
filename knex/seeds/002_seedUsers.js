const tableName = 'users';
const users = require('./data/users');

exports.seed = async (knex) => {
  await knex(tableName).del();

  return knex(tableName).insert(users);
};
