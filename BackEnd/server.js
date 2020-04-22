const express = require('express')
const app = express()
// const port = 3000
const config = require('./config/config');
const {port} = config;

const hbs = require('express-handlebars')
const path = require('path')

const mongoose = require('./db/mongodb-connection')

const routerUsuario = require('./routes/usuario.route')
const routerEmpresa = require("./routes/empresa.route")


app.engine('hbs', hbs({
    extname: 'hbs', 
    defaultLayout: 'layout',
     layoutsDir: path.join(__dirname, './views/layouts') 
   }));

app.set('view engine', 'hbs');

app.get('/',(req,res)=>{
    res.render('home')
})


app.use('/usuario', routerUsuario)
app.use('/empresa', routerEmpresa)



app.listen(port, ()=>console.log("Running"))