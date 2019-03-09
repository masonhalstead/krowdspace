const mongoose = require('mongoose');

const creatorSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users'
  },
  projects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Projects'
    }
  ],
  domain: String,
  name: String,
  slug: String,
  post_link: String,
  post_message: String,
  post_image: String,
  last_facebook_post: Number,
  last_instagram_post: Number,
  last_pinterest_post: Number,
  last_twitter_post: Number,
  websites: [Object],
  image_url: String,
  biography: String,
  project_count: Number,
  location: String
});

const Creator = mongoose.model('Creators', creatorSchema);
exports.Creator = Creator;
