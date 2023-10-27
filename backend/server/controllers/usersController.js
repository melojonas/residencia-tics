// Import the User model
const User = require('../models/User');
const extend = require('lodash/extend');
const bcrypt = require('bcrypt');
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;

// Function to list all users
const listUsers = async (req, res) => {
    try {
        const users = await User.find().select('-hashed_password -__v');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createUser = async (req, res, next) => {
    const { body } = req;
    const user = new User();

    user.email = body.email;
    user.name = body.name || '';
    user.role = body.role || 'discente';

    if (body.password) {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(body.password, salt);
        user.password = hash;
    } else {
        // Generate a random password
        const randomPassword = Math.random().toString(36).slice(-8);
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(randomPassword, salt);
        user.password = hash;

        // Send the password to the user's email
        const oauth2Client = new OAuth2(
            process.env.CLIENT_ID,
            process.env.CLIENT_SECRET,
            'https://developers.google.com/oauthplayground'
        );

        oauth2Client.setCredentials({
            refresh_token: process.env.REFRESH_TOKEN
        });

        const accessToken = oauth2Client.getAccessToken();

        const smtpTransport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: process.env.EMAIL,
                clientId: process.env.CLIENT_ID,
                clientSecret: process.env.CLIENT_SECRET,
                refreshToken: process.env.REFRESH_TOKEN,
                accessToken: accessToken
            }
        });

        const mailOptions = {
            from: process.env.EMAIL,
            to: user.email,
            subject: 'Gestão Acadêmica - Senha temporária',
            text: `Sua senha temporária é ${randomPassword}. Você pode alterá-la na página de perfil.`
        };

        smtpTransport.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

        // Flag the user to change the password on the first login
        user.changePassword = true;
    }

    try {
        await user.save();
        res.status(201).json({
            message: "Usuário cadastrado com sucesso!"
        }); 
        
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Function to fetch a user by id
const getUserById = async (req, res, next, id) => {
    try {
        const user = await User.findById(id).select('-password -__v');

        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }
        
        req.profile = user;
        next();
    } catch (err) {
        next(err);
    }
};

// Function to read a user by id
const readUser = (req, res) => {
    res.json(req.profile);
};

// Function to update a user's information
const updateUser = async (req, res) => {
    try {
        let user = req.profile;
        user = extend(user, req.body);
        user.updated = Date.now();

        if (req.body.password) {
            user.password = req.body.password;
        }

        await user.save();

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Function to delete a user
const deleteUser = async (req, res) => {
    try {
        let user = req.profile;
        await user.deleteOne();
        res.json({ message: 'Usuário deletado.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    listUsers,
    createUser,
    getUserById,
    readUser,
    updateUser,
    deleteUser,
};
