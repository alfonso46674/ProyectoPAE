const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const fs = require('fs');
const jwt= require('jsonwebtoken');
const googleConfig = require('../config/GoogleConfig')
const Usuario = require('../models/Usuario');
const users = require('../users.json');



passport.use(new GoogleStrategy({
    clientID: googleConfig.clientID,
    clientSecret: googleConfig.clientSecret,
    callbackURL: googleConfig.callbackURL // http://localhost:3000/google/redirect
}, async function(accessToken, refreshToken, profile, done){
    // console.log(profile);
    if(profile == null){
        done(null, false, {error: "No se pudo autenticar"});
        return;
    }

    

    let usr = await Usuario.getUsers({email: profile._json.email})

    if(usr.length == 1){ // ya exite el usuario
        done(null, usr[0]);
        return;
    }else{ // no existe el usuario
        let nameGoogle = profile._json.name.split(" ")
        let uid = await Usuario.getUsersCount() + 1

        let response = await Usuario.createUser({
            uid: uid,
            nombre: nameGoogle[0],
            apellido: nameGoogle[1],
            email: profile._json.email,
            tipo: 'Trabajador',
            ofertasActuales: 0,
            estado: 'Disponible',
            password: ' '
        })
        console.log({usrDepuesCrear:usr});
        if(response == true){
            console.log({proflileEmail:profile._json.email});
            let allUsers = await Usuario.getUsers({}) // si quito esto se rompe el codigo
            // console.log({todosUsuarios:allUsers});
            let Busquedausr = await Usuario.getUserByEmail(profile._json.email);
            // console.log({buscandousr:Busquedausr});
            done(null, Busquedausr);
        return;
        }
        else{
            done(null,false,{error:"Error al crear usuario"});
            return;
        }

    }

}
    
))


function googleLogin(req,res){
    // console.log("Entrando a Google login");

    passport.authenticate('google', (err,user, info)=>{
        // console.log("Entrando a google strategy");
        // console.log(user);
        if(user){
            let token = jwt.sign({email:user.email}, process.env.SECRET_KEY, {expiresIn:'1h'})
            res.send({token})
        }else{
            res.status(401).send(info)
        }
    })(req,res)
}

module.exports = {googleLogin}

