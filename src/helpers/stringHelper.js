const generateRandomString = (length) => {
  let randomString = '';
  let randomAscii;

  for (let i = 0; i < length; i += 1) {
    randomAscii = Math.floor((Math.random() * 25) + 97);
    randomString += String.fromCharCode(randomAscii);
  }

  return randomString;
};

module.exports = generateRandomString;
