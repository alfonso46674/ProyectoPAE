const express = require('express')
const app = express();
const config = require('./config/config');
const {port} = config;

const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http').Server(app);
const io = require('socket.io')(http);


//import de rutas necearias
const routerUsuario = require('./routes/usuario.route')
const routerEmpresa = require('./routes/empresa.route')
const routerOferta = require('./routes/oferta.router')

const authRouter = require('./routes/auth')


 
//Midlewares
 app.use(cors()) // middleware para comunicar el server con el frontend
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static(__dirname + '/public')); // para usar las vistas generadas por angular en la carpeta public

//socket io

io.on('connection', function(socket){
    const chat = require('./socketIO/chat')(socket, io);
})

//cloudinary
const uploadRouter = require('./routes/upload')


//uso de las rutas
app.use('/api/usuarios', routerUsuario)
app.use('/api/empresas', routerEmpresa)
app.use('/api/ofertas',routerOferta)
app.use('/api',authRouter);
app.use(uploadRouter);


app.get('*', (req,res)=>res.sendFile(__dirname+'/public/index.html'))

 module.exports = {app,http,port}