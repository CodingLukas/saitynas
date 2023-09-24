const Ad = require('../models/ad');
const validator = require('../utils/validator');

exports.getAllAds = async (req, res) => {
  const ads = await Ad.getAll();
  res.json(ads);
};

exports.getAd = async (req, res) => {
  const id = req.params.id;
  const ad = await Ad.get(id);
  if (!ad) {
    return res.status(404).json({ error: 'Ad not found' });
  }
  res.json(ad);
};

exports.createAd = async (req, res) => {
  const data = req.body;
  if (!validator.validateAd(data)) {
    return res.status(400).json({ error: 'Invalid data' });
  }
  const ad = await Ad.create({
    ...data,
    visible: true,
    userId: req.decodedToken.uid,
  });
  res.status(201).json(ad);
};

exports.updateAd = async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  if (!validator.validateAd(data)) {
    return res.status(400).json({ error: 'Invalid data' });
  }

  const ad = req.ad;
  if (!ad) {
    return res.status(404).json({ error: 'Ad not found' });
  }

  const adUpdated = await Ad.update(id, data);

  return res.json(adUpdated);
};

exports.deleteAd = async (req, res) => {
  const id = req.params.id;
  const ad = await Ad.delete(id);

  if (!ad) {
    return res.status(404).json({ error: 'Ad not found' });
  }
  res.json({ message: 'Ad deleted' });
};
