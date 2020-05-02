const passport = require('passport')
const LocalStrategy = require('passport-local')
const jwt = require('jsonwebtoken')
const users = require('../users.json')


passport.use(new LocalStrategy({
    usernameField: 'email', // se deben de llamar usernameField y passwordField para que no genere errores
    passwordField: 'password'
}, function(email, password, done){

    console.log(email,password);
    let usr = users.find(u=>u.email == email && u.password == password);
    console.log("hola");

    if(usr){ // existe el usuario
        done(null,usr);
    }else{
        done(null, false, {error:"Datos incorrectos"});
    }

}))


function login(req,res){
    console.log({"req.body":req.body});
    
    passport.authenticate('local', (err, usr, info)=>{
        console.log(usr);
        if(usr){
            let token = jwt.sign({email:usr.email}, 'palabra secreta', {expiresIn:'1h'})
            res.send({token})
        }else{
            res.status(401).send(info)
        }
    })(req,res);

}

module.exports = {login}