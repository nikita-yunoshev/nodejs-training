const { Model } = require('objection');

class User extends Model {
  static get tableName() {
    return 'users';
  }

  static get relationMappings() {
    return {
      children: {
        relation: Model.BelongsToOneRelation,
        modelClass: 'Role',
        join: {
          from: 'users.role_id',
          to: 'persons.parentId',
        },
      },
    };
  }
}

module.exports = User;
