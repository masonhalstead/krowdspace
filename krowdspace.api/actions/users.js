const { User } = require('../models/user');

const userActions = async (action, req) => {
  switch (action) {
    case 'ADD_VIEWS':
      return User.findOneAndUpdate(
        { _id: req },
        { $inc: { viewed: 1 } },
        { new: true }
      );
    case 'ADD_PROJECT_COUNT':
      // code block
      break;
    default:
      return req;
  }
};

exports.userActions = userActions;
