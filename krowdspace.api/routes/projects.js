const auth = require('../middleware/auth');
const seperate = require('../middleware/project-seperate');
const group = require('../middleware/group');
const { User } = require('../models/user');
const { Metric } = require('../models/metric');
const { Creator } = require('../models/creator');
const { Project, validate } = require('../models/project');
const express = require('express');
const router = express.Router();

router.get('/', auth, async (req, res) => {
  const projects = await Project.find().sort('name');
  res.send(projects);
});

router.get('/featured', auth, async (req, res) => {
  const projects = await Project.find(
    { featured: true },
    'name image_url uri description'
  ).populate('metric_id');
  if (!projects) return res.send([]);

  res.send(projects);
});

router.post('/create', auth, seperate, async (req, res) => {
  const { error } = validate(req.body);
  let { user_id, creator_id, project, metric } = req.body;
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findById(user_id);
  if (!user) return res.status(400).send('User has not been registered.');

  let creator = await Creator.findById(creator_id);
  if (!creator) creator = new Creator(req.body.creator);

  project = await Project.findOne({ domain_id: project.domain_id });
  if (project) return res.status(400).send('Project is already registered.');

  metric = new Metric(metric);
  project = new Project(req.body.project);

  project.user = user._id;
  project.creator = creator._id;
  project.metrics = metric._id;

  creator.projects.push(project._id);
  creator.user = user._id;

  user.creator = creator._id;
  user.projects.push(project._id);

  metric.project = project._id;
  metric.creator = creator._id;
  metric.user = user._id;

  creator = await creator.save();
  metric = await metric.save();
  user = await user.save();
  project = await project.save();

  const token = user.generateAuthToken();
  res.status(200).send(token);
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
