const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

dotenv.config();

// Login function
const login = async (req, res) => {
    // Find the user by email
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(401).json({
                error: 'Usuário não encontrado'
            });
        }

        // Authenticate the user
        const authenticated = await user.authenticate(req.body.password);

        if (authenticated !== true) {
            return res.status(401).json({
                error: 'E-mail ou senha incorreta.'
            });
        }

        // Generate a JWT token
        const accessToken = jwt.sign({ _id: user._id, nome: user.nome }, process.env.JWT_SECRET);

        // Set the token as a cookie
        res.cookie('t', accessToken, { expire: new Date() + 9999 });

        //Return the response with the user and token
        res.status(200).json({accessToken, user: {_id : user._id, name: user.name, email: user.email}})
        
    } catch (error) {
        console.error(error) 
    }
};

const logout = (req, res) => {
    // Limpar o cookie de autenticação
    res.clearCookie('t', path='/', domain='localhost', secure=false, httpOnly=true);

    if (!req.cookies.t) {
        return res.status(401).json({
            error: 'Não autorizado'
        });
    }

    return res.json({ message: 'Deslogado com sucesso' });
};

// Authentication middleware
const isAuthenticated = (req, res, next) => {
    var token = req.cookies.t;

    if (!token) {
        return res.redirect('/auth/login');
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.redirect('/auth/login');
        }
        req.auth = decoded;
        next();
    });
};

// Authorization middleware
const isAuthorized = (req, res, next) => {
    const user = req.profile && req.auth && req.profile._id == req.auth._id;
    if (!user) {
        return res.status(403).json({
            error: 'Acesso negado.'
        });
    }
    next();
};


module.exports = {
    login,
    logout,
    isAuthenticated,
    isAuthorized
};
