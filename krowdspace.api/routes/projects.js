const auth = require('../middleware/auth');
const normalize = require('../middleware/project-normalize');
const metrics = require('../middleware/project-metrics');
const group = require('../middleware/group');
const { User } = require('../models/user');
const { Metric } = require('../models/metric');
const { Creator } = require('../models/creator');
const {
  Project,
  validateProject,
  validateProjectUpdate
} = require('../models/project');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  const { page, limit } = req.body;
  const projects = await Project.find()
    .limit(limit)
    .skip(limit * page)
    .populate('metrics')
    .sort('featured');
  res.send(projects);
});

router.get('/featured', auth, async (req, res) => {
  const projects = await Project.find(
    { featured: true },
    'name image_url uri description'
  ).populate('metrics');
  if (!projects) return res.send([]);

  res.send(projects);
});

router.post('/create', auth, normalize, metrics, async (req, res) => {
  const { error } = validateProject(req.body);
  let { user_id, creator_id, project, metrics } = req.body;
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findById(user_id);
  if (!user) return res.status(400).send('User has not been registered.');

  let creator = await Creator.findById(creator_id);
  if (!creator) creator = new Creator(req.body.creator);

  project = await Project.findOne({ uri: project.uri });
  if (project) return res.status(400).send('Project is already registered.');

  metrics = new Metric(metrics);
  project = new Project(req.body.project);

  project.user = user._id;
  project.creator = creator._id;
  project.metrics = metrics._id;

  creator.projects.push(project._id);
  creator.user = user._id;

  user.creator = creator._id;
  user.projects.push(project._id);

  metrics.project = project._id;
  metrics.creator = creator._id;
  metrics.user = user._id;

  creator = await creator.save();
  metrics = await metrics.save();
  user = await user.save();
  project = await project.save();

  const token = user.generateAuthToken();
  res.status(200).send(token);
});

router.put('/:project_id/update', [auth, group], async (req, res) => {
  const { error } = validateProjectUpdate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const project_id = req.params.project_id;
  const project = req.body;

  const projects = await Project.findOneAndUpdate(
    { uri: project_id },
    {
      featured: project.featured,
      allow_marketing: project.allow_marketing,
      category: project.category,
      retail_url: project.retail_url
    },
    { new: true }
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
