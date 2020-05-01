const express = require('express')
const app = express()
// const port = 3000
const config = require('./config/config');
const {port} = config;

const hbs = require('express-handlebars')
const path = require('path')



const cors = require('cors')
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));

app.use(cors());
app.use(express.json())
// app.use(bodyParser.json());

//passport
const passport = require('passport')
const expressSession = require('express-session')
app.use(expressSession({secret: "PalabraSecreta"}))   //poner secret key en .env
app.use(passport.initialize());
app.use(passport.session());

    //inicializar passport
    // let initPassport = require('./config/passport-setup')
    // initPassport(passport)

    const rutaPassPort = require('./routes/auth.route')
    const rutaProfile = require('./routes/profile.route')

    app.use('/', rutaPassPort);
    app.use('/profile', rutaProfile);




//rutas utilizadas para la API
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

//handlebars
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

// app.get('/user',async (req,res)=>{
//     res.status(200).json({name:'john'})
// })


    
    

    app.use('/usuarios', routerUsuario)
    app.use('/empresas', routerEmpresa)
    app.use('/ofertas',routerOferta)

    app.use(uploads)

    
    //console.log(profile);

    // app.use(cookieSession({
    //     maxAge: 24 * 60 * 60 * 1000,
    //     keys: ['clave'] //clave para encriptar
    // }))

    // app.use(passport.initialize());
    // app.use(passport.session());

    
    // const Prueba = require('./models/Usuario')
    // // let res = usuario.getUsers({nombre:"Ricardo"})
    // let res;
    //  async function hola(){
    //     let lol  = await Prueba.getUsers({nombre:"Ricardosss"})
    //     res = lol;
    //     console.log(lol);
    // }

    // hola()
// http.listen(port, ()=>console.log("Running"))

module.exports = {app,http,port}