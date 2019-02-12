module.exports = function(req, res, next) {
  if (req.user.group < 1) return res.status(403).send('Access denied');

  next();
};
