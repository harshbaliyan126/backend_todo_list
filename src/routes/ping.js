const express = require('express');
const router = express.Router();
const { postPing } = require('../controller/ping');

router.post('/', postPing);

module.exports = router;
