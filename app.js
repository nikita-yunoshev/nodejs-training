const path = require('path');

const createError = require('http-errors');
const express = require('express');
const { Model } = require('objection');
const fileUpload = require('express-fileupload');
const passport = require('passport');
const graphqlHTTP = require('express-graphql');
const { makeExecutableSchema } = require('graphql-tools');

const knex = require('./src/db');
const usersRouter = require('./src/routes/users');
const authRouter = require('./src/routes/auth');
const UserService = require('./src/services/userService');
require('./src/config/passport');

Model.knex(knex);

const app = express();

app.use(passport.initialize());

// view engine setup
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'jade');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, './public')));
app.use(fileUpload());

app.use('/auth', authRouter);
app.use('/users', passport.authenticate('jwt', { session: false }), usersRouter);

const userService = new UserService();
let typeDefs = [`
  type Query {
    hello: String
  }
     
  type Mutation {
    hello(message: String): String
  }
`];
const resolvers = {
  Query: {
  },
  Mutation: {
  },
};

typeDefs += userService.configTypeDefs();
userService.configResolvers(resolvers);

app.use(
  '/graphql',
  graphqlHTTP({
    schema: makeExecutableSchema({ typeDefs, resolvers }),
    graphiql: true,
  }),
);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
