const router = require('express').Router();
const user = require('./user');
const question = require('./question');
const questionUpload = require('./questionUpload');

router.use('/user', user);
router.use('/question', question);
router.use('/questionUpload', questionUpload);

module.exports = router;