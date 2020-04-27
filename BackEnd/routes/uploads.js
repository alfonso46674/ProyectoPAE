const router = require('express').Router();
const multer = require('multer');
const path = require('path');

router.get('/upload', (req,res)=>{
    res.send('En upload');
})

const storage = multer.diskStorage({
    destination: path.join(__dirname, '../repository'),
    filename: (req, file, cb) => {
        cb(null, new Date().getTime()+path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    if(file.mimetype == 'image/jpeg' || file.mimetype == 'image/png'){
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const uploadImg = multer({
    storage,
    limits: {fileSize : 10000000},
    fileFilter
});

router.post('/upload', uploadImg.single('image'), async (req, res) => {
    console.log(req.body);
    //res.redirect(303, '/uploads')
})


router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../repository/YT.png'));
});

module.exports = router;