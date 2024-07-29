const express = require('express');
const router = express.Router();

const {getRetreats, getSingleRetreat} = require("../controller/retreatsController.js");

router.get('/get-all',getRetreats);
router.get('/get-one/:id',getSingleRetreat);

module.exports = router;
