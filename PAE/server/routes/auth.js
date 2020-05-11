const router = require('express').Router()
const passport = require('passport')
// const users = require('../users.json')
const passportLocal = require('../config/passportLocal')
const passportGoogle = require('../config/passportGoogle')



router.post('/login',passportLocal.login)

router.get('/google/login', passport.authenticate('google', {scope:['profile','email']}))

// router.get('/google/login', (req,res)=>{
//     console.log("test login");
//     res.send('si')
// })

router.get('/google/redirect', passportGoogle.googleLogin)

module.exports = router;
