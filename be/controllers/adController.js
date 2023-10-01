const Ad = require('../models/ad');
const Comment = require('../models/comment');
const validator = require('../utils/validator');

exports.getAllAds = async (req, res) => {
  const categoryId = req.params.id;
  const ads = await Ad.getAllByCategoryId(categoryId); // You will need to create this method in your Ad model
  res.json(ads);
};

exports.getAd = async (req, res) => {
  const adId = req.params.adid;
  const ad = await Ad.get(adId);
  if (!ad) {
    return res.status(404).json({ error: 'Ad not found' });
  }
  res.json(ad);
};

exports.createAd = async (req, res) => {
  const data = req.body;
  const categoryId = req.params.id;
  const errors = validator.validateAd(req.body);
  if (errors) {
    return res.status(400).json({ errors });
  }
  const ad = await Ad.create({
    ...data,
    categoryId, // Adding category Id to the ad data
    visible: true,
    userId: req.decodedToken.userId,
  });
  res.status(201).json(ad);
};

exports.updateAd = async (req, res) => {
  const adId = req.params.adid;
  const data = req.body;
  const errors = validator.validateAd(req.body);
  if (errors) {
    return res.status(400).json({ errors });
  }
  // console.log(adId, data);
  const ad = await Ad.get(adId);
  if (!ad) {
    return res.status(404).json({ error: 'Ad not found ' });
  }

  const adUpdated = await Ad.update(adId, data);

  return res.json(adUpdated);
};

exports.deleteAd = async (req, res) => {
  const ads = await Comment.getAllByCategoryId(id);
  if (ads.length > 0) {
    // console.log(
    //   'ids ',
    //   ads.map((ad) => ad.id)
    // );
    return res
      .status(409)
      .json({ error: 'Category cannot be deleted until its ads are removed' });
  }

  const ad = req.ad;

  if (!ad) {
    return res.status(404).json({ error: 'Ad not found ' });
  }
  res.json({ message: 'Ad deleted' });
};
