const Joi = require('joi');
const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  domain: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  normalized_url: {
    type: String,
    required: true
  },
  categories: {
    type: Array,
    required: true
  },
  project: {
    type: String
  },
  name: {
    type: String
  },
  image_url: {
    type: String
  },
  currency: {
    type: String
  },
  currency_symbol: {
    type: String
  },
  creator_name: {
    type: String
  },
  creator_image_url: {
    type: String
  },
  creator_profile: {
    type: String
  },
  backers: {
    type: Number
  },
  funded: {
    type: Number
  },
  location: {
    type: String
  },
  project_id: {
    type: String
  },
  project_count: {
    type: Number
  },
  website: {
    type: String
  },
  description: {
    type: String
  },
  video_url: {
    type: String
  },
  video_img_url: {
    type: String
  },
  goal: {
    type: Number
  },
  pledged: {
    type: Number
  },
  state: {
    type: String
  },
  deadline: {
    type: Date
  },
  project_url: {
    type: String
  }
});

const Project = mongoose.model('Projects', projectSchema);

function validateProject(project) {
  const schema = {
    domain: Joi.string().required(),
    url: Joi.string().required(),
    normalized_url: Joi.string().required(),
    owner: Joi.string().required(),
    project_id: Joi.string().required(),
    project: Joi.string().required(),
    categories: Joi.array().required(),
    name: Joi.string().optional(),
    image_url: Joi.string().optional(),
    currency: Joi.string().optional(),
    currency_symbol: Joi.string().optional(),
    creator_name: Joi.string().optional(),
    creator_image_url: Joi.string().optional(),
    creator_profile: Joi.string().optional(),
    backers: Joi.number().optional(),
    funded: Joi.number().optional(),
    location: Joi.string().optional(),
    project_count: Joi.number().optional(),
    website: Joi.array().optional(),
    description: Joi.string().optional(),
    video_url: Joi.string().optional(),
    video_img_url: Joi.string().optional(),
    goal: Joi.number().optional(),
    pledged: Joi.number().optional(),
    state: Joi.string().optional(),
    deadline: Joi.date().optional(),
    project_url: Joi.string().optional()
  };

  return Joi.validate(project, schema);
}

exports.projectSchema = projectSchema;
exports.Project = Project;
exports.validate = validateProject;
