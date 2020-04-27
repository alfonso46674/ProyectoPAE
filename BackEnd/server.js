const express = require('express')
const app = express()
// const port = 3000
const config = require('./config/config');
const {port} = config;

const hbs = require('express-handlebars')
const path = require('path')

// const mongoose = require('./db/mongodb-connection')


//rutas utilizadas para la base de datos
const routerUsuario = require('./routes/usuario.route')
const routerEmpresa = require("./routes/empresa.route")
const routerOferta = require('./routes/oferta.router')


//socket io
const http = require('http').Server(app);
const io = require('socket.io')(http);

io.on('connection', function(socket){
    const chat = require('./socketIO/chat')(socket, io);
})


//multer
const uploads = require('./routes/uploads')

app.use(express.json())
app.engine('hbs', hbs({
    extname: 'hbs', 
    defaultLayout: 'layout',
     layoutsDir: path.join(__dirname, './views/layouts')
   }));

app.set('view engine', 'hbs');

app.get('/',(req,res)=>{
    res.render('home')
});


    
    
    app.use('/usuarios', routerUsuario)
    app.use('/empresas', routerEmpresa)
    app.use('/ofertas',routerOferta)
    app.use(uploads)



http.listen(port, ()=>console.log("Running"))