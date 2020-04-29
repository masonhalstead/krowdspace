const { Creator } = require('../models/creator');

const creatorActions = async (action, req) => {
  switch (action) {
    case 'GET_CREATOR':
      return Creator.findOneAndUpdate(
        { _id: req },
        { $inc: { views_daily: 1, views_total: 1 } },
        { new: true }
      );
    default:
      return req;
  }
};

exports.creatorActions = creatorActions;
