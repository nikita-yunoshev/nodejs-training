const tableName = 'users';
const users = require('./data/users');
const { getHash } = require('../../helpers/passwordHelper');

exports.seed = async (knex) => {
  await knex(tableName).del();

  for (const user of users) {
    const { password } = user;
    const hashedPassword = await getHash(password, 10);

    await knex('users').insert({ ...user, password: hashedPassword });
  }
};
