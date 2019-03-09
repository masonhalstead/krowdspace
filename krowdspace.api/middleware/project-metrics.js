const moment = require('moment');

module.exports = async function(req, res, next) {
  try {
    const { metrics, project } = req.body;
    const hours =
      moment(project.todays_date).diff(moment(project.start_date), 'hours') ||
      0;
    const days_total = Math.ceil(hours / 24) || 0;
    const backers_daily = parseInt(metrics.backers_total / days_total) || 0;
    const funded_daily = parseInt(metrics.funded_total / days_total) || 0;
    const pledged_daily = parseInt(metrics.pledged_total / days_total) || 0;

    req.body.metrics = {
      ...req.body.metrics,
      dates: [new Date()],
      views: [0],
      views_daily: 0,
      views_total: 0,
      likes: [0],
      likes_daily: 0,
      likes_total: 0,
      backers: [backers_daily],
      backers_daily: backers_daily,
      funded: [metrics.funded_total],
      funded_daily: funded_daily,
      pledged: [pledged_daily],
      pledged_daily: pledged_daily
    };

    next();
  } catch (ex) {
    res.status(400).send('Unable to normalize project');
  }
};
