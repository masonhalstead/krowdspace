const request = require('request-promise');
const $ = require('cheerio');

kickstarter = async (req) => {
    const { normalized_url, domain, url, categories } = req.body;
    const { _id } = req.user;
    return request(normalized_url)
    .then((html) => {
        const project_data = $('#react-project-header', html).attr('data-initial');
        const project_object = JSON.parse(project_data);
        const project_raw = $('.row',html).children('.col-8').html()
        
        const project_cheerio = $.load(project_raw);
        project_cheerio('*').each(function() {
            if(this.name !== 'img'){
                this.attribs = {};
            }
        });

        const project_cleaned = project_cheerio.html();
        const { project } = project_object;
        return {
            domain,
            url,
            normalized_url,
            categories,
            owner: _id,
            project_id: project.id || null,
            name: project.name || null,
            image_url: project.imageUrl || null,
            currency: project.currency || null,
            currency_symbol: project.goal.symbol || null,
            project: project_cleaned || null,
            creator_name: project.creator.name || null,
            creator_image_url: project.creator.imageUrl || null,
            creator_profile: project.creator.biography || null,
            backers: project.backersCount || null,
            funded: project.percentFunded || null,
            location: project.location.displayableName || null,
            project_count: project.creator.createdProjects.totalCount || null,
            website: project.creator.websites || null,
            description: project.description || null,
            video_url: project.video.videoSources.base.src || null,
            video_img_url: project.video.previewImageUrl || null,
            goal: project.goal.amount || null,
            pledged: project.pledged.amount || null,
            state: project.state || null,
            deadline: project.deadlineAt || null,
            project_url: project.url || null
        }
    })
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
}