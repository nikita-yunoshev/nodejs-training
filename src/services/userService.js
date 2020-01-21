const User = require('../models/UserModel');
const { getHash } = require('../helpers/passwordHelper');

module.exports = class UsersService {
  constructor() {
    this.users = User.query().select('*');
  }

  // eslint-disable-next-line class-methods-use-this
  configTypeDefs() {
    let typeDefs = `
      type User {
        id: Int,
        name: String,
        password: String,
        email: String,
        roleId: Int
      }
    `;
    typeDefs += ` 
      extend type Query {
        user(userId: Int): User,
        users: [User],
       }
    `;

    typeDefs += `
      extend type Mutation {
        createUser(
          name: String!,
          password: String!,
          email: String!,
          roleId: Int!
        ): User!,
        updateUser(
          id: ID!,
          name: String,
          password: String,
          email: String,
          roleId: Int
        ): User!,
        deleteUser(id: ID!): Boolean!
      }
    `;
    return typeDefs;
  }

  async configResolvers(resolversParam) {
    const resolvers = resolversParam;
    resolvers.Query.user = async (_, { userId }) => this.users.findById(userId);
    resolvers.Query.users = async () => this.users;
    resolvers.Mutation.createUser = async (_, userData) => {
      const { password } = userData;
      const hashedPassword = await getHash(password, 10);

      return User.query().insert({ ...userData, password: hashedPassword });
    };
    resolvers.Mutation.updateUser = async (_, userData) => User.query().findById(userData.id).patch(userData).returning('*');
    resolvers.Mutation.deleteUser = async (_, userData) => User.query().deleteById(userData.id);
  }
};
