const express = require('express');
const { makePayment } = require('../controller/checkout.controller');
const router = express.Router();

router.post('/create-checkout-session', makePayment);
// router.post('/webhook', bodyParser.raw({ type: 'application/json' }), webhook);

module.exports = router;