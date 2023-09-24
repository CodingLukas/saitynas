const express = require('express');
const adController = require('../controllers/adController');
const auth = require('../middleware/auth');
const check = require('../middleware/check');

const router = express.Router();

router.get('/', adController.getAllAds);
router.get('/:id', check.adExists, adController.getAd);
router.post(
  '/',
  auth.user,
  check.categoryExistsFromBody,
  adController.createAd
);
router.put(
  '/:id',
  auth.user,
  check.adExists,
  check.categoryExistsFromBody,
  check.adOwner,
  adController.updateAd
);
router.delete(
  '/:id',
  auth.user,
  check.adOwner,
  check.adExists,
  adController.deleteAd
);

module.exports = router;
