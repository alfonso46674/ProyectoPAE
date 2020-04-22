const router = require('express').Router()
const usuarioController = require('../controllers/usuario.controller')

router.get('/', (req,res)=>{
    res.send("GET / usuario")
})


router.get('/:id', (req,res)=>{
    res.send("GET /usuario:id")
})

module.exports = router;