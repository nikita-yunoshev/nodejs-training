const request = require('supertest');

const app = require('../../app');
const generateRandomString = require('../helpers/stringHelper');

const fixtures = require('./fixtures');

let token;

describe('Non-existing route', () => {
  test('It should respond with 404 for non-existing routes', async () => {
    const response = await request(app).get('/not-found');
    expect(response.statusCode).toBe(404);
  });
});

describe('GET users', () => {
  beforeAll((done) => {
    request(app)
      .post('/auth/login')
      .send({
        email: 'tom_cruise@example.com',
        password: '123123',
      })
      .end((err, response) => {
        token = response.body.token;
        done();
      });
  });

  test('It should return users', async () => {
    const response = await request(app)
      .get('/users')
      .set({
        Authorization: `Bearer ${token}`,
        'content-type': 'application/json',
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toMatchObject(fixtures.existingUsersStub);
  });
});

describe('GET user', () => {
  test('It should return a user', async () => {
    const response = await request(app)
      .get(`/users/${fixtures.existingUserStub.id}`)
      .set({
        Authorization: `Bearer ${token}`,
        'content-type': 'application/json',
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toMatchObject(fixtures.existingUserStub);
  });
});

describe('POST user', () => {
  test('It should create a user', async () => {
    const response = await request(app)
      .post('/users')
      .set({
        Authorization: `Bearer ${token}`,
        'content-type': 'application/json',
      })
      .send(fixtures.newUserStub);

    expect(response.statusCode).toBe(201);
  });

  test('It returns an error if name param is missing', async () => {
    const { name, ...userWithoutName } = fixtures.existingUserStub;
    const response = await request(app)
      .post('/users')
      .set({
        Authorization: `Bearer ${token}`,
        'content-type': 'application/json',
      })
      .send(userWithoutName);

    expect(response.statusCode).toBe(422);
    expect(response.body).toMatchObject({
      message: 'Validation error',
      errors: {
        name: {
          location: 'body',
          param: 'name',
          msg: 'Please provide name',
        },
      },
    });
  });

  test('It returns an error if email param is missing', async () => {
    const { email, ...userWithoutEmail } = fixtures.existingUserStub;
    const response = await request(app)
      .post('/users')
      .set({
        Authorization: `Bearer ${token}`,
        'content-type': 'application/json',
      })
      .send(userWithoutEmail);

    expect(response.statusCode).toBe(422);
    expect(response.body).toMatchObject({
      message: 'Validation error',
      errors: {
        email: {
          location: 'body',
          param: 'email',
          msg: 'Please provide email',
        },
      },
    });
  });

  test('It returns an error if password param is missing', async () => {
    const { password, ...userWithoutPassword } = fixtures.existingUserStub;
    const response = await request(app)
      .post('/users')
      .set({
        Authorization: `Bearer ${token}`,
        'content-type': 'application/json',
      })
      .send(userWithoutPassword);

    expect(response.statusCode).toBe(422);
    expect(response.body).toMatchObject({
      message: 'Validation error',
      errors: {
        password: {
          location: 'body',
          param: 'password',
          msg: 'Please provide password',
        },
      },
    });
  });

  test('It returns an error if password is less than 6 symbols', async () => {
    const userStub = fixtures.existingUserStub;
    userStub.password = generateRandomString(129);

    const response = await request(app)
      .post('/users')
      .set({
        Authorization: `Bearer ${token}`,
        'content-type': 'application/json',
      })
      .send(userStub);

    expect(response.statusCode).toBe(422);
    expect(response.body).toMatchObject({
      message: 'Validation error',
      errors: {
        password: {
          location: 'body',
          param: 'password',
          msg: 'Must be more than 6 and less than 128 chars long',
        },
      },
    });
  });

  test('It returns an error if password is grater than 128 symbols', async () => {
    const userStub = fixtures.existingUserStub;
    userStub.password = '123';

    const response = await request(app)
      .post('/users')
      .set({
        Authorization: `Bearer ${token}`,
        'content-type': 'application/json',
      })
      .send(userStub);

    expect(response.statusCode).toBe(422);
    expect(response.body).toMatchObject({
      message: 'Validation error',
      errors: {
        password: {
          location: 'body',
          param: 'password',
          msg: 'Must be more than 6 and less than 128 chars long',
        },
      },
    });
  });

  test('It returns an error if roleId param is missing', async () => {
    const { roleId, ...userWithoutRoleId } = fixtures.existingUserStub;
    const response = await request(app)
      .post('/users')
      .set({
        Authorization: `Bearer ${token}`,
        'content-type': 'application/json',
      })
      .send(userWithoutRoleId);

    expect(response.statusCode).toBe(422);
    expect(response.body).toMatchObject({
      message: 'Validation error',
      errors: {
        roleId: {
          location: 'body',
          param: 'roleId',
          msg: 'Please provide roleId',
        },
      },
    });
  });
});

describe('PATCH user', () => {
  test('It should patch user email', async () => {
    const existingUser = fixtures.existingUserStub;
    const newEmail = { email: 'new_email@example.com' };
    const response = await request(app)
      .patch(`/users/${existingUser.id}`)
      .set({
        Authorization: `Bearer ${token}`,
        'content-type': 'application/json',
      })
      .send(newEmail);

    expect(response.statusCode).toBe(200);
    expect(response.body).toMatchObject({ data: newEmail });
  });

  test('It should return an error if a user does not exist', async () => {
    const newEmail = { email: 'new_email@example.com' };
    const response = await request(app)
      .patch(`/users/${fixtures.notExistingUserId}`)
      .set({
        Authorization: `Bearer ${token}`,
        'content-type': 'application/json',
      })
      .send(newEmail);

    expect(response.statusCode).toBe(500);
  });
});

describe('DELETE user', () => {
  test('It should delete user', async () => {
    const { body: { newUser } } = await request(app)
      .post('/users')
      .set({
        Authorization: `Bearer ${token}`,
        'content-type': 'application/json',
      })
      .send(fixtures.newUserStub);

    const response = await request(app)
      .delete(`/users/${newUser.id}`)
      .set({
        Authorization: `Bearer ${token}`,
        'content-type': 'application/json',
      });

    expect(response.statusCode).toBe(204);
  });

  test('It should return an error if the user does not exist', async () => {
    const response = await request(app)
      .delete(`/users/${fixtures.notExistingUserId}`)
      .set({
        Authorization: `Bearer ${token}`,
        'content-type': 'application/json',
      });

    expect(response.statusCode).toBe(500);
  });
});
