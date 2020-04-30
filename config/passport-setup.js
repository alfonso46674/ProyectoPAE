const credencial = require('../config/credenciales.google');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

passport.use(new GoogleStrategy({
    clientID:  credencial.clientID,
    clientSecret: credencial.clientSecret,
    callbackURL: "http://localhost:3000/auth/google/redirect"
},
    function(accessToken, refreshToken, profile, done) {
        console.log("working");
        console.log(profile);
        done()
    }
,
    console.log(this.clientID)
));

passport.serializeUser((user, done)=>{
    done(null, user.id )
});

passport.deserializeUser((id, done)=>{
    let findUser = users.find(usr => usr.id == id);
    done(null, findUser);
})