const Joi = require('joi');
const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users'
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Creators'
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comments'
    }
  ],
  metrics: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Metrics'
  },
  uri: Number,
  featured: Boolean,
  domain_id: String,
  domain: String,
  category: String,
  short_link: String,
  url: String,
  start_date: Number,
  finish_date: Number,
  deadline: Number,
  state: String,
  description: String,
  name: String,
  image_url: String,
  content: String
});

const Project = mongoose.model('Projects', projectSchema);

function validateProject(data) {
  const project = Joi.object({
    uri: Joi.number().required(),
    featured: Joi.boolean().required(),
    domain_id: Joi.string().required(),
    domain: Joi.string().required(),
    category: Joi.string().required(),
    short_link: Joi.string().required(),
    url: Joi.string().required(),
    start_date: Joi.number().required(),
    finish_date: Joi.number().required(),
    duration: Joi.number().required(),
    state: Joi.string().required(),
    description: Joi.string().required(),
    name: Joi.string().required(),
    image_url: Joi.string().required(),
    content: Joi.string().required()
  });
  const creator = Joi.object({
    domain: Joi.string().required(),
    name: Joi.string().required(),
    websites: Joi.array().required(),
    image_url: Joi.string().required(),
    biography: Joi.string().required(),
    project_count: Joi.number().required(),
    location: Joi.string().required()
  });
  const metric = Joi.object({
    project: Joi.string().optional(),
    url: Joi.string().optional(),
    currency: Joi.string().optional(),
    currency_symbol: Joi.string().optional(),
    dates: Joi.array().optional(),
    views: Joi.array().optional(),
    views_daily: Joi.number().optional(),
    views_total: Joi.number().optional(),
    likes: Joi.array().optional(),
    likes_daily: Joi.number().optional(),
    likes_total: Joi.number().optional(),
    backers: Joi.array().optional(),
    backers_daily: Joi.number().optional(),
    backers_total: Joi.number().optional(),
    funded: Joi.array().optional(),
    funded_daily: Joi.number().optional(),
    funded_total: Joi.number().optional(),
    pledged: Joi.array().optional(),
    pledged_daily: Joi.number().optional(),
    pledged_total: Joi.number().optional(),
    goal: Joi.number().optional()
  });
  const schema = Joi.object({
    creator_id: Joi.string().optional(),
    user_id: Joi.string().required(),
    project: project,
    creator: creator,
    metric: metric
  });
  return Joi.validate(data, schema);
}

exports.Project = Project;
exports.projectSchema = projectSchema;
exports.validate = validateProject;
