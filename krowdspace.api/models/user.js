const Joi = require("joi");
const PasswordComplexity = require("joi-password-complexity");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const { PRIVATE_KEY } = process.env;

const userSchema = new mongoose.Schema({
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
  admin: {
    type: Boolean,
    required: false
  },
  project_owner: {
    type: Boolean,
    required: false
  },
  projects: [{ 
    type : mongoose.Schema.Types.ObjectId, 
    ref: 'Projects' }
  ],
  password_reset: {
    type: Boolean,
    required: false
  }
});

userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign(
    { _id: this._id, admin: this.admin },
    PRIVATE_KEY
  );
  return token;
};
const User = mongoose.model("Users", userSchema);

const complexityOptions = {
  min: 8,
  max: 30,
  lowerCase: 1,
  upperCase: 1,
  numeric: 1,
  symbol: 1,
  requirementCount: 3
};

function validateUser(user) {
  const schema = {
    name: Joi.string()
      .min(5)
      .max(50)
      .required(),
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email(),
    password: new PasswordComplexity(complexityOptions),
    sub: Joi.string().optional()
  };
  return Joi.validate(user, schema);
}
function validatePassword(password) {
  const schema = {
    password: new PasswordComplexity(complexityOptions),
  };

  return Joi.validate(password, schema);
}

exports.User = User;
exports.validatePassword = validatePassword;
exports.validate = validateUser;
