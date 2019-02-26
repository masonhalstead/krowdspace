const Joi = require('joi');
const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users'
  },
  creator_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Creators'
  },
  funding_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Fundings'
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comments'
    }
  ],
  likes: Number,
  views: Number,
  uri: Number,
  featured: Boolean,
  domain_id: String,
  domain: String,
  category: String,
  short_link: String,
  url: String,
  start_date: Number,
  finish_date: Number,
  currency_symbol: String,
  backers: Number,
  funded: Number,
  goal: Number,
  pledged: Number,
  duration: Number,
  deadline: Number,
  state: String,
  description: String,
  name: String,
  image_url: String,
  content: String,
  video: Array,
  video_image_url: String,
  location: String
});

const Project = mongoose.model('Projects', projectSchema);

function validateProject(data) {
  const project = Joi.object({
    domain_id: Joi.string().required(),
    domain: Joi.string().required(),
    category: Joi.string().required(),
    uri: Joi.number().required(),
    likes: Joi.number().required(),
    views: Joi.number().required(),
    featured: Joi.boolean().required(),
    short_link: Joi.string().optional(),
    url: Joi.string().optional(),
    start_date: Joi.number().optional(),
    finish_date: Joi.number().optional(),
    currency_symbol: Joi.string().optional(),
    backers: Joi.number().optional(),
    funded: Joi.number().optional(),
    goal: Joi.number().optional(),
    pledged: Joi.number().optional(),
    duration: Joi.number().optional(),
    deadline: Joi.number().optional(),
    state: Joi.string().optional(),
    description: Joi.string().optional(),
    name: Joi.string().optional(),
    image_url: Joi.string().optional(),
    content: Joi.string().optional(),
    url: Joi.string().optional(),
    video: Joi.array().optional(),
    video_image_url: Joi.string().optional(),
    location: Joi.string().optional()
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
  const funding = Joi.object({
    project: Joi.string().required(),
    currency: Joi.string().optional(),
    currency_symbol: Joi.string().optional(),
    date: Joi.array().optional(),
    backers: Joi.array().optional(),
    funded: Joi.array().optional(),
    goal: Joi.number().optional(),
    pledged: Joi.array().optional()
  });
  const schema = Joi.object({
    creator_id: Joi.string().optional(),
    user_id: Joi.string().required(),
    project: project,
    creator: creator,
    funding: funding
  });
  return Joi.validate(data, schema);
}

exports.projectSchema = projectSchema;
exports.Project = Project;
exports.validate = validateProject;
