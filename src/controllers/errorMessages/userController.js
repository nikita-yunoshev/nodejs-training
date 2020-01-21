const userErrors = {
  userNotFoundDetails: (id) => ({
    errors: {
      userId: {
        location: 'params',
        param: 'id',
        value: id,
        msg: 'User is not found',
      },
    },
  }),
};

module.exports = userErrors;
