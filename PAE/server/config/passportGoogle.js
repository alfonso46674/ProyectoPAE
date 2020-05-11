const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const fs = require('fs');
const jwt= require('jsonwebtoken');
const googleConfig = require('../config/GoogleConfig')
const users = require('../users.json');


passport.use(new GoogleStrategy({
    clientID: googleConfig.clientID,
    clientSecret: googleConfig.clientSecret,
    callbackURL: googleConfig.callbackURL // http://localhost:3000/google/redirect
}, function(accessToken, refreshToken, profile, done){
    console.log(profile);
    if(profile == null){
        done(null, false, {error: "No se pudo autenticar"});
        return;
    }

    let newUser = {
        email: profile._json.email,
        info: profile._json
    }

    let findUser = users.find( u => u.email == newUser.email); 

    if(findUser){ // ya exite el usuario
        done(null, findUser);
        return;
    }else{ // no existe el usuario
        users.push(newUser);
        fs.writeFileSync('users.json', JSON.stringify(users));
        done(null, newUser);
        return;
    }

}
    
))


function googleLogin(req,res){
    console.log("Entrando a Google login");

    passport.authenticate('google', (err,user, info)=>{
        console.log("Entrando a google strategy");
        console.log(user);
        if(user){
            let token = jwt.sign({email:user.email}, process.env.SECRET_KEY, {expiresIn:'1h'})
            res.send({token})
        }else{
            res.status(401).send(info)
        }
    })(req,res)
}

module.exports = {googleLogin}

