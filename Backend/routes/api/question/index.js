const router = require('express').Router();
const controller = require('./question.controller');
const authmiddleware = require('../../../middlewares/jwt');

router.get('/upload', authmiddleware, controller.callarray);

module.exports = router;