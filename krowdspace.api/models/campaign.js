const Joi = require("joi");
const mongoose = require("mongoose");

const campaignSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  }
});

const Campaign = mongoose.model("Campaign", campaignSchema);

function validateCampaign(campaign) {
  const schema = {
    name: Joi.string()
      .min(3)
      .required()
  };

  return Joi.validate(campaign, schema);
}

exports.campaignSchema = campaignSchema;
exports.Campaign = Campaign;
exports.validate = validateCampaign;
