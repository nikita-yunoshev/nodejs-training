const { Model } = require('objection');

class Role extends Model {
  static get tableName() {
    return 'roles';
  }

  static get relationMappings() {
    return {
      children: {
        relation: Model.HasManyRelation,
        modelClass: 'User',
        join: {
          from: 'roles.id',
          to: 'users.role_id',
        },
      },
    };
  }
}

module.exports = Role;
