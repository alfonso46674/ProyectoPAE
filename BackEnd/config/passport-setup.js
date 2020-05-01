// let login = require('./login.passport')
// let registro = require('./registro.passport')
let passport = require('passport')
let LocalStrategy = require('passport-local').Strategy;
let Usuario = require('../models/Usuario')

passport.use('local',new LocalStrategy({
   email:'email',
   password: 'pass' 
    },  function(email, password, done){
        console.log("dentro de passport", email, password);
        let usr = Usuario.getUsers({email:email, password:password})
        console.log("usr",usr);
        if(usr){
            done(null, usr)
        }else{
            done(null, false, {error: "datos incorrectos"})
        }
    }))

     function login(req,res){
        console.log(req.body);
        passport.authenticate('local', (err,usr,info)=>{
        console.log(usr, info);
        if(usr){
            console.log("Autenticado");
            let token ="123456"
            res.send(token)
        }else{
            console.log("No autenticado");  
            res.status(401).send(info)
        }

    })(req,res);

}

module.exports = {login}



// module.exports = function(passport){

//     passport.serializeUser(function(user,done){
//         console.log("Serializing user: ");console.log(user);
//         done(null, user.uid);
//     });

//     passport.deserializeUser(async function(uid, done){
//         let usr = await Usuario.getUsers({uid:uid})
//         console.log("Deserialize", usr);
//         if(await Usuario.exists({uid:uid}) == false){
//             done(err,null)
//         }else{
//             done(null, usr)
//         }
//         // Usuario.getUsers({uid:uid})
//         // .then((user)=>{
//         //     done(null, user)
//         // })
//         // .catch((err)=>{
//         //     done(err,null)
//         // })
//     });
//     console.log("dentro de passport setup");
//     //Estrategias de passport para login y registro
//     login(passport);
    // registro(passport);

// }