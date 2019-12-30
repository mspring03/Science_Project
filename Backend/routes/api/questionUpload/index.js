const router = require('express').Router();
const controller = require('./questionUpload.controller');

const multer = require('multer');
const path = require('path');

const uploader = multer({
    storage: multer.diskStorage({
        destination(req, file, cb){
            cb(null, 'uploads/');
        },
        
        filename( req, file, cb )
        {
            cb( null, file.originalname);
        }
    }),
    limits: { filesize: 5 * 1024 * 1024 }
});

router.post('/upload', uploader.single('img'), controller.uploadFile, controller.saveArray);
router.post('/add', controller.addarray);

module.exports = router;