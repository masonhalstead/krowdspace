const mongoose = require('mongoose');

const creatorSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users'
  },
  projects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Projects'
    }
  ],
  creator_id: String,
  domain: String,
  name: String,
  websites: [Object],
  image_url: String,
  biography: String,
  project_count: Number,
  location: String
});

const Creator = mongoose.model('Creators', creatorSchema);
exports.Creator = Creator;
