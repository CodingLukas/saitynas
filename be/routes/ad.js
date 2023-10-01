const express = require('express');
const adController = require('../controllers/adController');
const auth = require('../middleware/auth');
const check = require('../middleware/check');

const router = express.Router();

router.get(
  '/categories/:id/ads',
  check.categoryExistsFromParams,
  adController.getAllAds
);
router.get(
  '/categories/:id/ads/:adid',
  check.categoryExistsFromParams,
  check.adExistsFromParams,
  adController.getAd
);
router.post(
  '/categories/:id/ads',
  auth.isValidJWT,
  check.categoryExistsFromParams,
  adController.createAd
);
router.put(
  '/categories/:id/ads/:adid',
  auth.isValidJWT,
  check.categoryExistsFromParams,
  check.adExistsFromParams,
  check.adBelongsToCategory,
  check.adOwnerOrAdmin,
  adController.updateAd
);
router.delete(
  '/categories/:id/ads/:adid',
  auth.isValidJWT,
  check.categoryExistsFromParams,
  check.adExistsFromParams,
  check.adBelongsToCategory,
  check.adOwnerOrAdmin,
  adController.deleteAd
);

module.exports = router;
