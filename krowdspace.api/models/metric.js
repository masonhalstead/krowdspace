const mongoose = require('mongoose');

const metricSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users'
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Creators'
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Projects'
  },
  url: String,
  currency: String,
  currency_symbol: String,
  dates: Array,
  likes: Array,
  likes_daily: Number,
  likes_total: Number,
  backers: Array,
  backers_daily: Number,
  backers_total: Number,
  funded: Array,
  funded_daily: Number,
  funded_total: Number,
  pledged: Array,
  pledged_daily: Number,
  pledged_total: Number,
  views: Array,
  views_daily: Number,
  views_total: Number,
  goal: Number,
  duration: Number
});

const Metric = mongoose.model('Metrics', metricSchema);

exports.Metric = Metric;
