const tableName = 'users';

exports.up = (knex) => knex.schema.createTable(tableName, (table) => {
  table.increments('id').primary();
  table.string('name').notNullable();
  table.string('email').notNullable();
  table.string('password').notNullable();
  table
    .integer('role_id')
    .notNullable()
    .references('roles.id')
    .onUpdate('CASCADE')
    .onDelete('RESTRICT');
});

exports.down = (knex) => knex.schema.dropTable(tableName);
