// Import the User model
const User = require('../models/User');
const extend = require('lodash/extend');
const bcrypt = require('bcrypt');
const { google } = require('googleapis');
const sendMail = require('../mail/gmail');

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
    const { name, role, email, password, confirmPassword } = req.body;
    const user = new User();

    user.email = email;
    user.name = name || '';
    user.role = role || 'Discente';

    if (user.password) {
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
        const mailOptions = {
            from: process.env.EMAIL,
            to: user.email,
            subject: 'Gestão Acadêmica - Senha temporária',
            text: `Sua senha temporária é ${randomPassword}. Você pode alterá-la na página de perfil.`
        };

        sendMail(mailOptions)
            .then((id) => {
                console.log(`Email sent: ${id}`);
            })
            .catch((error) => {
                console.error(error);
            });

        // Flag the user to change the password on the first login
        user.changePassword = true;
    }

    if (user.confirmPassword) {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(body.confirmPassword, salt);
        user.confirmPassword = hash;
    } else {
        // Generate a random password
        const randomPassword = Math.random().toString(36).slice(-8);
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(randomPassword, salt);
        user.confirmPassword = hash;

        // Send the password to the user's email
        const mailOptions = {
            from: process.env.EMAIL,
            to: user.email,
            subject: 'Gestão Acadêmica - Senha temporária',
            text: `Sua senha temporária é ${randomPassword}. Você pode alterá-la na página de perfil.`
        };

        sendMail(mailOptions)
            .then((id) => {
                console.log(`Email sent: ${id}`);
            })
            .catch((error) => {
                console.error(error);
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
        console.log(err);
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
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

// Get only Discentes
const listDiscentes = async (req, res) => {
    try {
        const users = await User.find({ role: "Discente" }).select('-hashed_password -__v');
        res.json(users);
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
    listDiscentes
};
