// let LocalStrategy = require('passport-local').Strategy;
// let Usuario = require('../models/Usuario')



// module.exports = function(passport){
//     passport.use('login', new LocalStrategy({
//         passReqToCallback: true
//     },
//         function( email, password, done){
//             console.log(email,password);
//             Usuario.getUsers({email:email, password:password})
//             .then((user)=>{

//                 if(user.length != 1){ // No existe el usuario
//                     console.log("Datos incorrectos; Usuario no econtrado");
//                    return done(null,false)
//                 }
//                 else{
//                    return done(null,user)
//                 }
//             })

//             .catch((err)=>{
//                return done(err)
//             })
//         }
//     ))
// }