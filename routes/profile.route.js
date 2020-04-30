const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('profile');
    console.log(req.user);
});

module.exports = router;