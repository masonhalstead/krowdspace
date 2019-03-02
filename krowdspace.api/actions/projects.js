const { Project } = require('../models/project');

const projectActions = async (action, req) => {
  switch (action) {
    case 'POPULATE_METRICS':
      return Project.findById(req).populate('metric_id');

    case 'ADD_PROJECT_COUNT':
      // code block
      break;
    default:
      return req;
  }
};

exports.projectActions = projectActions;
