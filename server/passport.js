const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../server/models/User');

module.exports = function(passport) {

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(async function(id, done) {
        try {
            const user = await User.findById(id);
            done(null, user);
        } catch (error) {
            done(error);
        }
    });

    passport.use('local-signup', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback : true
        }, async function(req, email, password, done) {

        process.nextTick(async function() {
            try {
                const user = await User.findOne({ 'email': email });
                if (user) {
                    return done(null, false, req.flash('signupMessage', 'Este e-mail já está cadastrado.'));
                } else {
                    const newUser = new User();
                    newUser.email = email;
                    newUser.hashed_password = password;
                    newUser.name = req.body.name;
                    newUser.role = req.body.role;
                    await newUser.save( (err) => {
                        if (err) throw err;
                        return done(null, newUser);
                    });
                }
            } catch (err) {
                return done(err);
            }
        }
        );
    }
    ));

    passport.use('local-login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback : true
    }, async function(req, email, password, done) {
        try {
            const user = await User.findOne({ 'email': email });
            if (!user) return done(null, false, req.flash('signinMessage', 'Usuário não encontrado.'));
            if (!user.comparePassword(password)) return done(null, false, req.flash('signinMessage', 'Senha incorreta.'));
            return done(null, user);
        } catch (err) {
            return done(err);
        }
    }));
}