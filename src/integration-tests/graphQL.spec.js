const request = require('supertest');

const app = require('../../app');

const fixtures = require('./fixtures');
const generateRandomString = require('../helpers/stringHelper');
let token;

describe('GET users', () => {
  test('It should return users', async () => {
    const response = await request(app)
      .get('/graphql')
      .set('content-type', 'application/json')
      .send({
        "query": "{ users { id, name, email, roleId } }"
      });
    expect(response.statusCode).toBe(200);
    expect(response.body).toMatchObject(
      {
        "data": {
          "users": fixtures.existingUsersStub
        }
      });
  });
});

describe('GET user', () => {
  test('It should return a user', async () => {
    const response = await request(app)
      .get('/graphql')
      .set('content-type', 'application/json')
      .send({
        "query": "{ user(userId: 1) { id, name, email, roleId } }"
      });;

    expect(response.statusCode).toBe(200);
    expect(response.body).toMatchObject(
      {
        "data": {
          "user": fixtures.existingUserStub
        }
      });
  });
});

