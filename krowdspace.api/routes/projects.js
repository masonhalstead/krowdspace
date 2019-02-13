const auth = require('../middleware/auth');
const seperate = require('../middleware/project-seperate');
const group = require('../middleware/group');
const { User } = require('../models/user');
const { Funding } = require('../models/funding');
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
  );
  if (!projects) return res.send([]);

  res.send(projects);
});

router.post('/create', auth, seperate, async (req, res) => {
  const { error } = validate(req.body);
  let { user_id, creator_id, project, funding } = req.body;
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findById(user_id);
  if (!user) return res.status(400).send('User has not been registered.');

  let creator = await Creator.findById(creator_id);
  if (!creator) creator = new Creator(req.body.creator);

  project = await Project.findOne({ domain_id: project.domain_id });
  if (project) return res.status(400).send('Project is already registered.');

  funding = new Funding(funding);
  project = new Project(req.body.project);

  project.user_id = user._id;
  project.creator_id = creator._id;
  project.funding_id = funding._id;

  creator.projects.push(project._id);
  creator.user_id = user._id;

  user.creator_id = creator._id;
  user.projects.push(project._id);

  funding.project_id = project._id;
  funding.creator_id = creator._id;
  funding.user_id = user._id;

  creator = await creator.save();
  funding = await funding.save();
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
