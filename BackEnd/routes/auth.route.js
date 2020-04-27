const router = require('express').Router();
const passport = require('passport');

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/google/login',passport.authenticate('google',{
    scope:['profile', 'email']
}));

router.get('/google/redirect', (req, res) => {
    //console.log(req.query.code);
    res.send('google/redirect');
});

router.get('/google/redirect', passport.authenticate('google'), (req,res)=>{
    res.redirect('/profile')
})

router.get('/logout', (req, res) => {
    res.send('logout');
});


module.exports = router;