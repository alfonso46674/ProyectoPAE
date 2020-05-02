const express = require('express')
const cors = require('cors')
const fs = require('fs')
const users = require('./users.json')
const authRouter = require('./routes/auth')
var bodyParser = require('body-parser');

 const app = express();

 app.use(cors()) // middleware para comunicar el server con el frontend
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(authRouter);

 app.get('/',(req,res)=>{
     res.send("hola")
 })


 app.get('/api/users', (req,res)=>{
     console.log("query params",req.query);
     req.json(users);
 })

 app.post('/api/users',(req,res)=>{
    console.log(req.body);
    
    let {nombre, pass, estado, hobbies} = req.body

    if(nombre && pass & estado && hobbies != undefined){
        if(users.some(u => u.nombre == nombre)){
            res.status(401).send({error:"Usuario ya existente"})
        }else{
            let newUser = {nombre, pass, estado, hobbies}
            users.push(newUser)
            fs.writeFileSync('users.json', JSON.stringify(users))
        }
    }else{
        res.status(400).send({error: "faltan datos"})
    }

 })

 app.listen(3000, ()=>console.log("Running"))