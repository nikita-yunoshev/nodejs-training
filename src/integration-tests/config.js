module.exports = {
  rootDir: '../',
  globalSetup: './integration-tests/setup.js',
  coverageDirectory: './coverage/',
  verbose: true,
  collectCoverageFrom: [
    '<rootDir>/src/controllers/**.js',
    '<rootDir>/src/helpers/**.js',
    '<rootDir>/src/middlewares/**.js',
    '<rootDir>/src/models/**.js',
    '<rootDir>/src/routes/**.js',
    '<rootDir>/src/services/**.js',
  ],
};
