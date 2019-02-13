const mongoose = require('mongoose');

const fundingSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users'
  },
  creator_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Creators'
  },
  project_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Projects'
  },
  currency: String,
  currency_symbol: String,
  date: Array,
  backers: Array,
  funded: Array,
  goal: Number,
  pledged: Array
});

const Funding = mongoose.model('Fundings', fundingSchema);
exports.Funding = Funding;
