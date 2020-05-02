const router = require('express').Router()
// const users = require('../users.json')
const passportLocal = require('./passportLocal')



// router.post('/api/login',(req,res)=>{

//     if(req.body.correo && req.body.password){
//         let usr = users.find(u => u.correo == req.body.correo && u.pass == req.body.password)
//         if(usr){
//             res.send({token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJ0ZXN0IjoiYWRzYXNkYXMiLCJleHAiOjE2NzcyMzkwMjJ9.Ps2mL_BUk7_5Gg0vEG5fNnl3_06P1auLF0TcbktOkjU' })
//         }else{
//             res.status(401).send({error:"Datos incorrectos, verifique"})
//         }
//     }else{
//         res.status(400).send({error:"Faltan datos"})
//     }

// })

router.post('/api/login',passportLocal.login)


module.exports = router;
