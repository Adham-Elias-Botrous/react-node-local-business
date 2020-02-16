const express = require('express');
const router = express.Router();
const { emailFeedBack } = require('../controllers/feedback');

router.post('/feedback', emailFeedBack);

module.exports = router;
