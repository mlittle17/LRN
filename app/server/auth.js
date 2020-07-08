const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

module.exports = (passport) => {
    passport.serializeUser((user, done) => {
        done(null, user);
    });
    passport.deserializeUser((user, done) => {
        done(null, user);
    });
    passport.use(new GoogleStrategy({
            clientID: '986631321216-n48rdct7h242bhiveccrobds87j5vhr4.apps.googleusercontent.com',
            clientSecret: '2OKD4EI2Ntq-zSBUxfzRPHTF',
            callbackURL: 'http://localhost:8000/auth/google/callback'
        },
        (token, refreshToken, profile, done) => {
            return done(null, {
                profile: profile,
                token: token
            });
        }));
};