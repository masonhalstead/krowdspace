const { Metric } = require('../models/metric');

const metricActions = async (action, req) => {
  switch (action) {
    case 'ADD_VIEWS':
      return Metric.findOneAndUpdate(
        { _id: req },
        { $inc: { views_daily: 1, views_total: 1 } },
        { new: true }
      );
    default:
      return req;
  }
};

exports.metricActions = metricActions;
