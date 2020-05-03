const router = require('express').Router()
// const users = require('../users.json')
const passportLocal = require('../config/passportLocal')



router.post('/login',passportLocal.login)


module.exports = router;
