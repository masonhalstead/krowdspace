const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { Campaign, validate } = require("../models/campaign");
const express = require("express");
const router = express.Router();

router.get("/", auth, async (req, res) => {
  try {
    const campaigns = await Campaign.find().sort("name");
    res.send(campaigns);
  } catch (ex) {
    res.status(500).send("Something failed");
  }
});

router.post("/", auth, async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let campaign = new Campaign({ name: req.body.name });
    campaign = await campaign.save();

    res.send(campaign);
  } catch (ex) {
    res.status(500).send("Something failed");
  }
});

router.put("/:id", auth, async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const campaign = await Campaign.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },
      {
        new: true
      }
    );

    if (!campaign)
      return res.status(404).send("The genre with the given ID was not found.");

    res.send(campaign);
  } catch (ex) {
    res.status(500).send("Something failed");
  }
});

router.delete("/:id", [auth, admin], async (req, res) => {
  try {
    const campaign = await Campaign.findByIdAndRemove(req.params.id);

    if (!campaign)
      return res.status(404).send("The genre with the given ID was not found.");

    res.send(campaign);
  } catch (ex) {
    res.status(500).send("Something failed");
  }
});

router.get("/:id", auth, async (req, res) => {
  const campaign = await Campaign.findById(req.params.id);

  if (!campaign)
    return res.status(404).send("The genre with the given ID was not found.");

  res.send(campaign);
});

module.exports = router;
