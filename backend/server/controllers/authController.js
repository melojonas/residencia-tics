const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

dotenv.config();

// Login function
const login = async (req, res) => {
    const { email, password } = req.body;

    // HTTP status 406: Not Acceptable
    if (!email || !password) {
        return res.status(406).json({ error: 'E-mail e senha são obrigatórios.' }); }

    // Procurar o usuário no banco de dados
    const user = await User.findOne({ email });
    
    if (!user) {
        return res.status(401).json({ error: 'E-mail ou senha incorreta.' }); }

    // Verificar se a senha está correta
    const authenticated = await user.authenticate(req.body.password);

    if (authenticated !== true) {
        return res.status(401).json({ error: 'E-mail ou senha incorreta.' }); }

    // Generate a JWT tokens
    const accessToken = jwt.sign({
        "email": user.email,
        "role": user.role
    }, process.env.JWT_ACCESS_SECRET, { expiresIn: '8h' });

    const refreshToken = jwt.sign(
        { "email": user.email },
        process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' }
    );

    // Cookie seguro para o refresh token
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 dias
    });

    // Return com o token de acesso e o usuário. IMPORTANTE: mesmo nome de variável do frontend.
    res.status(200).json({accessToken, user: {_id : user._id, name: user.name, email: user.email}})
};

// Refresh token function
const refresh = (req, res) => {
    const cookies = req.cookies;

    if (!cookies?.refreshToken) { return res.status(401).json({ error: 'Não autorizado' }); }

    const refreshToken = cookies.refreshToken;

    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
        if (err) { return res.status(401).json({ error: 'Não autorizado' }); }

        const user = User.findOne({ email: decoded.email });

        if (!user) { return res.status(401).json({ error: 'Não autorizado' }); }

        const accessToken = jwt.sign({
            "email": user.email,
            "role": user.role
        }, process.env.JWT_ACCESS_SECRET, { expiresIn: '8h' });

        res.status(200).json({accessToken, user: {_id : user._id, name: user.name, email: user.email}})
    });
};

const logout = (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.refreshToken) return res.status(204);
    res.clearCookie('refreshToken', { httpOnly: true, secure: true, sameSite: 'none' });
    res.status(200).json({ message: 'Logout realizado com sucesso.' });
};

// Authentication middleware
const isAuthenticated = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Não autorizado.' }); }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err, decoded) => {
        if (err) { return res.status(401).json({ error: 'Não autorizado.' }); }

        req.email = decoded.email;
        req.role = decoded.role;
        next();
    });
};

// Authorization middleware
const isAuthorized = (req, res, next) => {
    next();
};


module.exports = {
    login,
    refresh,
    logout,
    isAuthenticated,
    isAuthorized
};
