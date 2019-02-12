const _ = require('lodash');
const auth = require('../middleware/auth');
const bcrypt = require('bcrypt');
const google = require('../middleware/auth-google');
const { User, validate, validatePassword } = require('../models/user');
const express = require('express');
const router = express.Router();

router.get('/me', auth, async (req, res) => {
  const user = await User.findById(req.user._id)
    .populate('projects')
    .select('-password');
  res.send(user);
});
router.put('/password-reset', auth, async (req, res) => {
  const { error } = validatePassword(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const salt = await bcrypt.genSalt(10);
  password = await bcrypt.hash(req.body.password, salt);

  const user = await User.findByIdAndUpdate(req.user._id, {
    password: password,
    password_reset: false
  });

  if (!user) return res.status(404).send('The user was not found.');

  res.status(200);
});
router.post('/google', google, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send('User is already registered.');

  user = new User(_.pick(req.body, ['name', 'email', 'password', 'sub']));
  user.password_reset = true;
  const salt = await bcrypt.genSalt(10);
  user.sub = await bcrypt.hash(user.sub, salt);
  user.password = await bcrypt.hash(user.password, salt);
  user = await user.save();
  const token = user.generateAuthToken();
  res.send(token);
});
router.post('/create', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send('User is already registered.');

  user = new User(_.pick(req.body, ['name', 'email', 'password']));
  user.password_reset = false;
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  user = await user.save();
  const token = user.generateAuthToken();
  res.send(token);
});
module.exports = router;
