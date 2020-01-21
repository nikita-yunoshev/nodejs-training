const existingUsersStub = [
  {
    id: 1,
    name: 'Tom Cruise',
    email: 'tom_cruise@example.com',
    roleId: 1,
  },
  {
    id: 2,
    name: 'Bruce Willis',
    email: 'bruce_willis@example.com',
    roleId: 1,
  },
  {
    id: 3,
    name: 'Christian Bale',
    email: 'christian_bale@example.com',
    roleId: 2,
  },
];

const existingUserStub = {
  id: 1,
  name: 'Tom Cruise',
  email: 'tom_cruise@example.com',
  roleId: 1,
};

const newUserStub = {
  name: 'Bill Gates',
  email: 'bill_gates@example.com',
  password: '123123',
  roleId: 1,
};

const notExistingUserId = 9999999;

module.exports = {
  existingUsersStub,
  existingUserStub,
  newUserStub,
  notExistingUserId,
};
