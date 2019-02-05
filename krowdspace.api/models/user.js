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
  group: {
    type: Number
  },
  admin: {
    type: Boolean
  }
});

userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign(
    { _id: this._id, group: this.group, admin: this.admin },
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
  requirementCount: 4
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
    password: new PasswordComplexity(complexityOptions)
  };
  return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;
