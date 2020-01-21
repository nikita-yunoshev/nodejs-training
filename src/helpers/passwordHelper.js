const util = require('util');

const bcrypt = require('bcrypt');

const getHash = util.promisify(bcrypt.hash).bind(bcrypt);

const isEqual = (password, hash) => {
  if (!password || !hash) {
    return null;
  }

  return bcrypt.compare(password, hash);
};

module.exports = {
  getHash,
  isEqual,
};
