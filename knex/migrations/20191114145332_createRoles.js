const tableName = 'roles';

exports.up = (knex) => knex.schema.createTable(tableName, (table) => {
  table.increments('id').primary();
  table.string('slug').notNullable();
});

exports.down = (knex) => knex.schema.dropTable(tableName);
