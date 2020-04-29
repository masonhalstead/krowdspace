const _ = require('lodash');
const auth = require('../middleware/auth');
const bcrypt = require('bcrypt');
const google = require('../middleware/auth-google');
const express = require('express');
const router = express.Router();
const { Project } = require('../models/project');
const { Creator } = require('../models/creator');
const { userActions } = require('../actions/users');
const { metricActions } = require('../actions/metrics');

const {
  User,
  validateUser,
  validatePassword,
  validateUserUpdate
} = require('../models/user');

router.get('/me', auth, async (req, res) => {
  const project_count = await Project.find().countDocuments();
  let user = await User.findByIdAndUpdate(
    req.user._id,
    { project_count: project_count },
    { new: true }
  ).populate({
    path: 'projects',
    populate: { path: 'metrics' }
  });

  res.send(user);
});

router.get('/projects/:project_id', auth, async (req, res) => {
  const project_id = req.params.project_id;
  const user_id = req.user._id;

  const project = await Project.findOne({ uri: project_id });
  const creator = await Creator.findOne({ _id: project.creator });
  const metrics = await metricActions('ADD_VIEWS', project.metrics);
  const user = await userActions('ADD_VIEWS', user_id);

  if (!project) return res.status(404).send('The project was not found.');
  if (!creator)
    return res.status(404).send('The project creator was not found.');
  if (String(user._id) !== String(project.user))
    return res.status(404).send('Unauthorized to access this project');

  res.send({ project, metrics, creator });
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
  const { error } = validateUser(req.body);
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
  const { error } = validateUser(req.body);
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
