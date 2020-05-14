const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const globby = require('globby');
const Usuario = require('../models/Usuario');
require('dotenv').config();

//cloudinary
const cloudinary = require('cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})



const storage = multer.diskStorage({
    destination: path.join(__dirname, '../cloudinary/repository'),
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
})

const fileFilter = (req, file, cb) => {
    if(file.mimetype == 'image/jpeg' ||
       file.mimetype == 'image/png') {
           cb(null, true);
       }else {
           cb(null, false);
       }
}; 

const uploadImage = multer({
    storage,
    fileFilter
})




router.post('/upload_local', uploadImage.single('image'), (req, res) => {
    console.log(req.body);
    if(req.error){
        res.send(req.error);
    } else{
        res.send({"mensaje":"imagen guardada"})
    }
})

router.post('/upload', uploadImage.single('image'), async (req, res) => {
    // console.log({reqfile : req.file});
    const result = await cloudinary.v2.uploader.upload(req.file.path);
    // console.log(result);
    console.log({ImagenGuardada: result.url});
    // window.localStorage.setItem('urlCloudinary', result.url)
    let doc = await Usuario.updateUser(req.body.email, {urlFoto: result.url});

    


    //let data = JSON.parse(fs.readFileSync('./repo/imageList.json'));
    //let newData = String (result.url);
    //data.push(newData);

    //let save = fs.writeFileSync('./repo/imageList.json', JSON.stringify(data));

    //await fs.unlink(req.file.path);
    //res.redirect(303, '/upload_cloud');
});

//router.get('/imgTest', (req, res) => {
//    res.sendFile(path.join(__dirname, '../repository/YT'))
//})

module.exports = router;









//router.get('/upload', async (req,res) => { 

//    try{
//        const paths = await globby(['**/public/repository/*']);
        //res.send(typeof (paths));
//        let str = JSON.stringify(paths);
        //Para reemplazar todas las coincidencias se necesita poner una bandera global
        // The magic happens with the g flag of the regular expression which indicates a global search and replace.
//        let response = str.replace(new RegExp('public/', 'g'), '');
        //res.send(response);

 //       res.render('uploads', 
   //     {   title: 'Pagina de Subidas', 
     //       condition: false, 
       //     list: JSON.parse(response)
        //});

        
 //   }
   // catch(error){
     //   console.log(error);
    //}

//});