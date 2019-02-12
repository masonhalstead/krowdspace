const auth = require('../middleware/auth');
const project = require('../middleware/project-link');
const group = require('../middleware/group');
const { User } = require('../models/user');
const { Project, validate } = require('../models/project');
const express = require('express');
const router = express.Router();

router.get('/', auth, async (req, res) => {
  const projects = await Project.find().sort('name');
  res.send(projects);
});

router.post('/create', auth, project, async (req, res) => {
  const { error } = validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  let campaign = await Project.findOne({ project_id: req.body.project_id });
  if (campaign) return res.status(400).send('Project is already registered.');

  campaign = new Project(req.body);
  campaign = await campaign.save();

  let user = await User.findById(campaign.owner);
  if (!user) return res.status(400).send('The user was not found.');

  user.projects.push(campaign._id);
  user.project_owner = true;

  user = await user.save();

  res.send(campaign);
});

router.put('/:id', [auth, group], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const projects = await Project.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    {
      new: true
    }
  );

  if (!projects)
    return res.status(404).send('The genre with the given ID was not found.');

  res.send(projects);
});

router.delete('/:id', [auth, group], async (req, res) => {
  const projects = await Project.findByIdAndRemove(req.params.id);

  if (!projects)
    return res.status(404).send('The genre with the given ID was not found.');

  res.send(projects);
});

router.get('/:id', auth, async (req, res) => {
  const projects = await Project.findById(req.params.id);

  if (!projects)
    return res.status(404).send('The genre with the given ID was not found.');

  res.send(projects);
});

module.exports = router;
