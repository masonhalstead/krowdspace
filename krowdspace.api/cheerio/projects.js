const request = require('request-promise');
const moment = require('moment');
const $ = require('cheerio');

kickstarter = async req => {
  const { normalized_url, domain, category } = req.body;
  const { _id, creator_id } = req.user;
  return request(normalized_url).then(html => {
    const project_data = $('#react-project-header', html).attr('data-initial');
    const project_object = JSON.parse(project_data);
    const project_raw = $('.row', html)
      .children('.col-8')
      .html();

    const project_cheerio = $.load(project_raw);
    project_cheerio('*').each(function() {
      if (this.name !== 'img') {
        this.attribs = {};
      }
    });

    const project_cleaned = project_cheerio.html();
    const { project } = project_object;

    const finish_date = project.deadlineAt * 1000;
    const start_date = finish_date - 1000 * 60 * 60 * 24 * project.duration;

    const day_diff = 2;
    const day_count =
      day_diff + moment(finish_date).diff(moment(new Date()), 'days');
    let days = [];
    for (let day = 0; day < day_count; day++) {
      days.push(
        moment()
          .add(day, 'days')
          .toDate()
      );
    }

    return {
      user_id: _id,
      creator_id: creator_id,
      project: {
        uri: project.pid || parseInt(Math.random() * 10000000, 10),
        featured: false,
        domain_id: project.id || undefined,
        domain: domain || undefined,
        category: category || undefined,
        short_link: project.projectShortLink || undefined,
        url: project.url || undefined,
        start_date: start_date,
        finish_date: finish_date,
        duration: project.duration || 0,
        state: project.state || undefined,
        description: project.description || undefined,
        name: project.name || undefined,
        image_url: project.imageUrl || undefined,
        content: project_cleaned || undefined
      },
      creator: {
        domain: domain || undefined,
        name: project.creator.name || undefined,
        websites: project.creator.websites || undefined,
        image_url: project.creator.imageUrl || undefined,
        biography: project.creator.biography || undefined,
        project_count: project.creator.createdProjects.totalCount || 0,
        location: project.location.displayableName || undefined
      },
      metric: {
        project: project.id || undefined,
        url: project.url || undefined,
        currency: project.currency || undefined,
        currency_symbol: project.goal.symbol || '$',
        dates: days,
        views: [0],
        views_daily: 0,
        views_total: 0,
        likes: [0],
        likes_daily: 0,
        likes_total: 0,
        backers: [project.backersCount] || [0],
        backers_daily: project.backersCount || 0,
        backers_total: project.backersCount || 0,
        funded: [project.percentFunded] || [0],
        funded_daily: project.percentFunded || 0,
        funded_total: project.percentFunded || 0,
        pledged: [project.pledged.amount] || [0],
        pledged_daily: project.pledged.amount || 0,
        pledged_total: project.pledged.amount || 0,
        goal: project.goal.amount || 0
      }
    };
  });
};
indiegogo = async (req, res, next) => {
  // const token = req.header("x-auth-token");
  // if (!token) return res.status(401).send("Access denied, No token provided");
  // try {
  //   const decoded = jwt.verify(token, PRIVATE_KEY);
  //   req.user = decoded;
  //   next();
  // } catch (ex) {
  //   res.status(400).send("Invalid token");
  // }
};

module.exports = {
  kickstarter: kickstarter,
  indiegogo: indiegogo
};
