const passport = require('passport')
const LocalStrategy = require('passport-local')
const jwt = require('jsonwebtoken')
const Usuario = require('../models/Usuario')
const Empresa = require('../models/Empresa');
require('dotenv').config();



passport.use(new LocalStrategy({
    usernameField: 'email', // se deben de llamar usernameField y passwordField para que no genere errores
    passwordField: 'password'
}, async function(email, password, done){

    // console.log(email,password);
    let usr = await Usuario.getUsers({email:email, password:password})
    // console.log(usr.length);
    if(usr.length == 0){ // no se encontro un usuario de tipo trabajador, ahora a buscar en el tipo empresa
        usr = await Empresa.getCompanies({email:email, password:password})
    }

    if(usr.length == 1){ // existe el usuario
        done(null,usr[0]);
    }else{
        done(null, false, {error:"Datos incorrectos"});
    }
}))


function login(req,res){
    // console.log({"req.body":req.body});
    
    passport.authenticate('local', (err, usr, info)=>{
        // console.log(usr.tipo);
        if(usr){
            let tipo = usr.tipo;
            let token = jwt.sign({email:usr.email}, process.env.SECRET_KEY, {expiresIn:'1h'})
            res.send({token,tipo})
        }else{
            res.status(401).send(info)
        }
    })(req,res);

}

module.exports = {login}