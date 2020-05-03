const passport = require('passport')
const LocalStrategy = require('passport-local')
const jwt = require('jsonwebtoken')
const Usuario = require('../models/Usuario')
require('dotenv').config();


passport.use(new LocalStrategy({
    usernameField: 'email', // se deben de llamar usernameField y passwordField para que no genere errores
    passwordField: 'password'
}, async function(email, password, done){

    // console.log(email,password);
    let usr = await Usuario.getUsers({email:email, password:password})
    // console.log(usr.length);

    if(usr.length == 1){ // existe el usuario
        done(null,usr);
    }else{
        done(null, false, {error:"Datos incorrectos"});
    }

}))


function login(req,res){
    // console.log({"req.body":req.body});
    
    passport.authenticate('local', (err, usr, info)=>{
        // console.log(usr);
        if(usr){
            let token = jwt.sign({email:usr.email}, process.env.SECRET_KEY, {expiresIn:'1h'})
            res.send({token})
        }else{
            res.status(401).send(info)
        }
    })(req,res);

}

module.exports = {login}