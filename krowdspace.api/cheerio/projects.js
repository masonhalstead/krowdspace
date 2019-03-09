const request = require('request-promise');
const moment = require('moment');
const $ = require('cheerio');
const { INDIEGOGO_API_KEY } = process.env;

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
    const kickstarter = project_object.project;
    const project_uri = parseInt(Math.random() * 10000000, 10);

    const finish_date = kickstarter.deadlineAt * 1000;
    const start_date = finish_date - 1000 * 60 * 60 * 24 * kickstarter.duration;
    const todays_date = new Date().getTime();

    return {
      user_id: _id,
      creator_id: creator_id,
      project: {
        uri: project_uri,
        featured: kickstarter.percentFunded > 100 ? true : false,
        slug: kickstarter.slug,
        domain: domain,
        category: category,
        short_link: kickstarter.projectShortLink,
        url: kickstarter.url,
        retail_url: undefined,
        allow_marketing: false,
        start_date: start_date,
        todays_date: todays_date,
        finish_date: finish_date,
        last_sync: todays_date,
        duration: kickstarter.duration,
        state: kickstarter.state,
        description: kickstarter.description,
        name: kickstarter.name,
        image_url: kickstarter.imageUrl,
        content: project_cleaned
      },
      creator: {
        name: kickstarter.creator.name,
        domain: domain,
        slug: kickstarter.slug,
        post_link: `https://krowdspace.com/projects/${project_uri}`,
        post_message: kickstarter.title,
        post_image: kickstarter.imageUrl,
        last_facebook_post: 0,
        last_instagram_post: 0,
        last_pinterest_post: 0,
        last_twitter_post: 0,
        image_url: kickstarter.creator.imageUrl,
        biography: kickstarter.creator.biography,
        project_count: kickstarter.creator.createdProjects.totalCount,
        location: kickstarter.location.displayableName
      },
      metrics: {
        domain: domain,
        slug: kickstarter.slug,
        currency: kickstarter.currency,
        currency_symbol: kickstarter.goal.symbol,
        backers_total: kickstarter.backersCount,
        funded_total: kickstarter.percentFunded,
        pledged_total: kickstarter.pledged.amount,
        goal: kickstarter.goal.amount
      }
    };
  });
};
indiegogo = async (req, res, next) => {
  const { normalized_url, domain, category } = req.body;
  const { _id, creator_id } = req.user;

  const indiegogo_path = new URL(normalized_url).pathname;
  const indiegogo_project = indiegogo_path.split('/');
  const api_url = `https://api.indiegogo.com/1/campaigns/${
    indiegogo_project[2]
  }.json?api_token=${INDIEGOGO_API_KEY}`;

  return request(api_url).then(res => {
    const json_res = JSON.parse(res);
    const indiegogo = json_res.response;
    const project_uri = parseInt(Math.random() * 10000000, 10);

    const funded_total = (indiegogo.collected_funds / indiegogo.goal) * 100;
    const finish_date = new Date(indiegogo.funding_ends_at).getTime();
    const todays_date = new Date().getTime();
    const start_date = new Date(indiegogo.funding_started_at).getTime();

    return {
      user_id: _id,
      creator_id: creator_id,
      project: {
        uri: project_uri,
        featured: funded_total > 100 ? true : false,
        slug: indiegogo.slug,
        domain: domain,
        category: category,
        short_link: `https://igg.me/at/${indiegogo.short_link}`,
        url: indiegogo.web_url,
        retail_url: undefined,
        allow_marketing: false,
        start_date: start_date,
        todays_date: todays_date,
        finish_date: finish_date,
        last_sync: todays_date,
        duration: indiegogo.funding_days,
        state: indiegogo.status,
        description: indiegogo.tagline,
        name: indiegogo.title,
        image_url:
          indiegogo.video_overlay_url ||
          indiegogo.baseball_card_image_url ||
          undefined,
        content: indiegogo.description_html
      },
      metrics: {
        domain: domain,
        slug: indiegogo.slug,
        currency: indiegogo.currency.iso_code,
        currency_symbol: indiegogo.currency.symbol,
        backers_total: indiegogo.contributions_count,
        funded_total: (indiegogo.collected_funds / indiegogo.goal) * 100,
        pledged_total: indiegogo.collected_funds,
        goal: indiegogo.goal
      },
      creator: {
        name: undefined,
        domain: domain,
        slug: indiegogo.slug,
        image_url: indiegogo.baseball_card_image_url,
        biography: undefined,
        project_count: 1,
        location: `${indiegogo.city},${indiegogo.country}`,
        post_link: `https://krowdspace.com/projects/${project_uri}`,
        post_message: indiegogo.title,
        post_image:
          indiegogo.video_overlay_url ||
          indiegogo.baseball_card_image_url ||
          undefined,
        last_facebook_post: 0,
        last_instagram_post: 0,
        last_pinterest_post: 0,
        last_twitter_post: 0,
        websites: [
          {
            url: indiegogo.facebook_url,
            domain: 'Facebook'
          },
          {
            url: indiegogo.twitter_url,
            domain: 'Twitter'
          },
          {
            url: indiegogo.youtube_url,
            domain: 'Youtube'
          },
          {
            url: indiegogo.imdb_url,
            domain: 'IMBD'
          },
          {
            url: indiegogo.website_url,
            domain: 'Website'
          }
        ]
      }
    };
  });
};

module.exports = {
  kickstarter: kickstarter,
  indiegogo: indiegogo
};
