const isUrl = require('is-url');
const { kickstarter } = require('../cheerio/projects');

module.exports = async function(req, res, next) {
  let { url, domain } = req.body;
  url = url.split(/\/?\//);

  const regex_domain = new RegExp(`${domain}.com`);
  const regex_protocol = new RegExp('http');
  const regex_search = new RegExp(/[?]ref/);

  const normalized_url = url.reduce((acc, next) => {
    if (regex_protocol.test(next)) return acc;
    if (regex_domain.test(next)) return acc;
    if (regex_search.test(next)) {
      link = next.split('?ref');
      return (acc = `${acc}/${link[0]}`);
    }

    return (acc = `${acc}/${next}`);
  }, `https://www.${domain}.com`);

  const error = isUrl(normalized_url);
  if (!error) return res.status(401).send('Invalid project url');

  req.body.normalized_url = normalized_url;

  switch (domain) {
    case 'kickstarter':
      await kickstarter(req)
        .then(res => {
          req.body = res;
          next();
        })
        .catch(err => {
          console.log(err);
          res.status(400).send('Error populating Kickstarter project');
        });
      break;
    case 'indiegogo':
      await indiegogo(req)
        .then(res => {
          req.body = res;
          next();
        })
        .catch(err => {
          res.status(400).send('Error populating Indiegogo project');
        });
      break;
    default:
      res.status(400).send('Error matching project domain');
  }
};
