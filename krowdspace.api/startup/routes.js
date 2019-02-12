const express = require('express');
const error = require('../middleware/error');
const cors = require('../middleware/cors');
const users = require('../routes/users');
const projects = require('../routes/projects');
const auth = require('../routes/auth');

module.exports = function(app) {
  app.use(express.json());
  app.use(cors);
  app.use('/api/users', users);
  app.use('/api/auth', auth);
  app.use('/api/projects', projects);
  app.use(error);
};
