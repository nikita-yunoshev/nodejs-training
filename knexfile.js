require('dotenv').config();

const env = { ...process.env };

module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: env.PSQL_HOST,
      user: env.PSQL_USER,
      password: env.PSQL_PASS,
      database: env.PSQL_DB,
    },
    migrations: {
      directory: env.PSQL_MIGRATIONS_DIRECTORY,
    },
    seeds: {
      directory: env.PSQL_SEEDS_DIRECTORY,
    },
  },
};
