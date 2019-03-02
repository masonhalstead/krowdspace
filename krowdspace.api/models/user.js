const Joi = require('joi');
const PasswordComplexity = require('joi-password-complexity');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const { PRIVATE_KEY } = process.env;

const userSchema = new mongoose.Schema({
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Creators'
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Projects'
    }
  ],
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comments'
    }
  ],
  projects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Projects'
    }
  ],
  name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024
  },
  sub: {
    type: String,
    required: false,
    minlength: 5,
    maxlength: 1024
  },
  password_reset: {
    type: Boolean,
    required: true
  },
  indiegogo_user: {
    type: String,
    default: null
  },
  viewed: {
    type: Number,
    default: 0
  },
  project_count: {
    type: Number,
    default: 0
  },
  kickstarter_user: {
    type: String,
    default: null
  },
  admin: Boolean
});

userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign(
    { _id: this._id, creator_id: this.creator_id, admin: this.admin },
    PRIVATE_KEY
  );
  return token;
};
const User = mongoose.model('Users', userSchema);

const complexityOptions = {
  min: 8,
  max: 30,
  lowerCase: 1,
  upperCase: 1,
  numeric: 1,
  symbol: 1,
  requirementCount: 3
};

function validateUser(req) {
  const schema = {
    name: Joi.string().optional(),
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email(),
    password: new PasswordComplexity(complexityOptions),
    password_reset: Joi.boolean().optional(),
    indiegogo_user: Joi.string()
      .valid('')
      .optional(),
    kickstarter_user: Joi.string()
      .valid('')
      .optional(),
    sub: Joi.string().optional()
  };
  return Joi.validate(req, schema);
}

function validateUserUpdate(user) {
  const schema = {
    name: Joi.string()
      .min(5)
      .max(50)
      .required(),
    indiegogo_user: Joi.string().optional(),
    kickstarter_user: Joi.string().optional()
  };
  return Joi.validate(user, schema);
}
function validatePassword(password) {
  const schema = {
    password: new PasswordComplexity(complexityOptions)
  };

  return Joi.validate(password, schema);
}
exports.User = User;
exports.validatePassword = validatePassword;
exports.validateUserUpdate = validateUserUpdate;
exports.validateUser = validateUser;
