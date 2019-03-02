var cron = require('node-cron');
const { Project } = require('../models/project');

cron.schedule('*/1 * * * *', async () => {
  const projects = await Project.find();
  //console.log(projects);
});
