module.exports = function(PRIVATE_KEY) {
  if (!PRIVATE_KEY) {
    throw new Error('FATAL ERROR: jwtPrivateKey is not defined');
  }
};
