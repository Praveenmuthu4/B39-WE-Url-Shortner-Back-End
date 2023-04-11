const express = require("express");

const router = express.Router();

const Url = require("../models/UrlModel");

router.get("/all", async (req, res, next) => {
  const all = await Url.findOne({});
  if (all) {
    return res.json(all);
  } else {
    return res.status(404).json("No URL Found");
  }
});

router.get("/:code", async (req, res) => {
  try {
    const url = await Url.findOne({
      urlCode: req.params.code,
    });
    if (url) {
      return res.redirect(url.longUrl);
    } else {
      return res.status(404).json("No URL Found");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json("Server Error");
  }
});

module.exports = router;
