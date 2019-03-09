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
  slug: String,
  domain: String,
  category: String,
  short_link: String,
  url: String,
  retail_url: String,
  allow_marketing: Boolean,
  start_date: Number,
  finish_date: Number,
  last_sync: Number,
  duration: Number,
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
    slug: Joi.string().required(),
    domain: Joi.string().required(),
    category: Joi.string().required(),
    short_link: Joi.string().required(),
    url: Joi.string().required(),
    retail_url: Joi.string().optional(),
    allow_marketing: Joi.bool().optional(),
    start_date: Joi.number().required(),
    todays_date: Joi.number().required(),
    finish_date: Joi.number().required(),
    last_sync: Joi.number().required(),
    duration: Joi.number().required(),
    state: Joi.string().required(),
    description: Joi.string().required(),
    name: Joi.string().required(),
    image_url: Joi.string().required(),
    content: Joi.string().required()
  });
  const creator = Joi.object({
    name: Joi.string().optional(),
    domain: Joi.string().optional(),
    slug: Joi.string().optional(),
    image_url: Joi.string().optional(),
    post_link: Joi.string().optional(),
    post_message: Joi.string().optional(),
    post_image: Joi.string().optional(),
    last_facebook_post: Joi.number().optional(),
    last_instagram_post: Joi.number().optional(),
    last_pinterest_post: Joi.number().optional(),
    last_twitter_post: Joi.number().optional(),
    biography: Joi.string().optional(),
    project_count: Joi.number().optional(),
    location: Joi.string().optional(),
    websites: Joi.array().optional()
  });
  const metrics = Joi.object({
    domain: Joi.string().optional(),
    slug: Joi.string().optional(),
    currency: Joi.string().optional(),
    currency_symbol: Joi.string().optional(),
    backers_total: Joi.number().optional(),
    funded_total: Joi.number().optional(),
    pledged_total: Joi.number().optional(),
    goal: Joi.number().optional(),
    dates: Joi.array().optional(),
    views: Joi.array().optional(),
    views_daily: Joi.number().optional(),
    views_total: Joi.number().optional(),
    likes: Joi.array().optional(),
    likes_daily: Joi.number().optional(),
    likes_total: Joi.number().optional(),
    backers: Joi.array().optional(),
    backers_daily: Joi.number().optional(),
    funded: Joi.array().optional(),
    funded_daily: Joi.number().optional(),
    pledged: Joi.array().optional(),
    pledged_daily: Joi.number().optional()
  });
  const schema = Joi.object({
    creator_id: Joi.string().optional(),
    user_id: Joi.string().required(),
    project: project,
    creator: creator,
    metrics: metrics
  });
  return Joi.validate(data, schema);
}

function validateProjectUpdate(req) {
  const schema = {
    featured: Joi.boolean().required(),
    allow_marketing: Joi.boolean().optional(),
    category: Joi.string().required(),
    retail_url: Joi.string()
      .valid('')
      .optional()
  };
  return Joi.validate(req, schema);
}

exports.Project = Project;
exports.projectSchema = projectSchema;
exports.validateProject = validateProject;
exports.validateProjectUpdate = validateProjectUpdate;
