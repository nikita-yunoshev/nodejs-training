const knex = require('../db');

exports.migrateDB = async () => {
  await knex.migrate.rollback();
  await knex.migrate.latest();
  await knex.seed.run();
};
