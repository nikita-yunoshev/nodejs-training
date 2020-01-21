const wrapWithObject = (key) => (value) => ({
  [key]: value,
});

module.exports = wrapWithObject;
