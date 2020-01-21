const authErrors = {
  invalidCredentialsErrorDetails: (value) => ({
    errors: {
      email: {
        location: 'body',
        param: 'email',
        value, // req.body.email,
        msg: 'The combination of email and password is invalid',
      },
      // password: {
      //   location: 'body',
      //   param: 'password',
      //   msg: 'The combination of email and password is invalid',
      // },
    },
  }),
};

module.exports = authErrors;
