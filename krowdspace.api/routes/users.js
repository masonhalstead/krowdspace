const _ = require('lodash');
const auth = require('../middleware/auth');
const bcrypt = require('bcrypt');
const google = require('../middleware/auth-google');
const { Project } = require('../models/project');
const {
  User,
  validate,
  validatePassword,
  validateUserUpdate
} = require('../models/user');
const express = require('express');
const router = express.Router();

router.get('/me', auth, async (req, res) => {
  const project_count = await Project.find().count();
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      project_count: project_count
    },
    {
      new: true
    }
  )
    .populate('projects')
    .select('-password -sub');

  res.send(user);
});
router.get('/projects/:project_id', auth, async (req, res) => {
  const project = await Project.findOneAndUpdate(
    { uri: req.params.project_id },
    { $inc: { views: 1 } },
    {
      new: true
    }
  ).populate('funding_id');
  const user = await User.findByIdAndUpdate(req.user._id, {
    $inc: { views: 1 }
  });

  if (!project) return res.status(404).send('The project was not found.');
  if (user._id.toString() !== project.user_id.toString())
    return res.status(404).send('Unauthorized to access this project');

  res.send(project);
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

  res.status(200).send('Password set successful.');
});
router.post('/google', google, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send('User is already registered.');

  user = new User(req.body);
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
router.post('/update', auth, async (req, res) => {
  const { error } = validateUserUpdate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      name: req.body.name,
      kickstarter_user: req.body.kickstarter_user,
      indiegogo_user: req.body.indiegogo_user
    },
    {
      new: true
    }
  ).select('-password -sub');
  res.send(user);
});
module.exports = router;
