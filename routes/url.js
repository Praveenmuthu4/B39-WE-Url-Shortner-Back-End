const express = require("express");
const validUrl = require("valid-url");
const shortid = require("shortid");

const router = express.Router();

const Url = require("../models/UrlModel");

const baseUrl = process.env.BASE_URL;

router.post("/shorten", async (req, res, next) => {
  const { longUrl } = req.body;

  if (!validUrl.isUri(baseUrl)) {
    return res.status(401).json("Invalid base Url");
  }

  const urlCode = shortid.generate();

  if (validUrl.isUri(longUrl)) {
    try {
      let url = await Url.findOne({
        longUrl: longUrl,
      });
      if (url) {
        res.json(url);
      } else {
        const shortUrl = baseUrl + "/" + urlCode;

        url = new Url({
          longUrl,
          shortUrl,
          urlCode,
          date: new Date(),
        });
        await url.save();
        res.json(url);
      }
    } catch (err) {
      console.log(err);
      res.status(500).json("Server Error");
    }
  } else {
    res.status(401).json("Invalid LongUrl");
  }
});

module.exports = router;
