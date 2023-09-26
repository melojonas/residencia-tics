const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const { expressjwt } = require('express-jwt');
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
        const token = jwt.sign({ _id: user._id }, 'fm6dyP40ljIrxa3lOVSdf9Jnc3yVofn1');

        // Set the token as a cookie
        res.cookie('t', token, { expire: new Date() + 9999 });

        // Return the response with the user and token
        const { _id, name, email } = user;
        return res.json({ token, user: { _id, name, email } });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'Erro interno do servidor'
        });
    }
};

const logout = (req, res) => {
    // Limpar o cookie de autenticação
    res.clearCookie('t');
    return res.json({ message: 'Deslogado com sucesso' });
};

// Authentication middleware
const isAuthenticated = expressjwt({
    secret: 'fm6dyP40ljIrxa3lOVSdf9Jnc3yVofn1',
    algorithms: ['HS256'],
    userProperty: 'auth',
    redirectTo: '/login'
});

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
