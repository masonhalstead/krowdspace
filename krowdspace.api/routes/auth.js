const _ = require('lodash');
const bcrypt = require('bcrypt');
const google = require('../middleware/auth-google');
const { User, validateUser } = require('../models/user');
const express = require('express');

const router = express.Router();

router.post('/google', google, async (req, res) => {
  const { error } = validateUser(req.body);
  res.set({ Accept: 'application/json, text/plain, */*' });

  if (error) return res.status(400).send(error.details[0].message);
  let user = await User.findOne({ email: req.body.email });
  if (!user)
    return res
      .status(400)
      .send('Please register an account before logging in.');

  if (!user.sub) {
    const salt = await bcrypt.genSalt(10);
    user.sub = await bcrypt.hash(req.body.sub, salt);
    user = await user.save();
  }
  if (user.sub) {
    const validSub = await bcrypt.compare(req.body.sub, user.sub);
    if (!validSub) return res.status(400).send('Invalid email or password.');
  }

  const token = user.generateAuthToken();
  res.send(token);
});
router.post('/', async (req, res) => {
  const { error } = validateUser(req.body);
  res.set({ Accept: 'application/json, text/plain, */*' });

  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send('Invalid email or password.');

  const validPassword = await bcrypt.compare(req.body.password, user.password);

  if (!validPassword) return res.status(400).send('Invalid email or password.');

  const token = user.generateAuthToken();
  res.send(token);
});

module.exports = router;
