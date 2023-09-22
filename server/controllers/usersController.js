// Import the User model
const User = require('../models/User');
const extend = require('lodash/extend');

// Function to list all users
const listUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password -third_party_auth');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Function to create a new user
const createUser = async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        return res.status(201).json({
            message: "Usuário cadastrado com sucesso!"})
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
}

// Function to fetch a user by id
const getUserById = async (req, res, next, id) => {
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'Usuário não existe' });
        }
        req.profile = user;
        next();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Function to read a user by id
const readUser = (req, res) => {
    req.profile.password = undefined;
    return res.json(req.profile);
};

// Function to update a user's information
const updateUser = async (req, res) => {
    try {
        let user = req.profile
        user = extend(user, req.body)
        user.updated = Date.now()
        
        await user.save()

        user.password = undefined
        user.salt = undefined
        res.json(user, { message: 'Usuário atualizado' })
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Function to delete a user
const deleteUser = async (req, res) => {
    try {
        let user = req.profile;
        
        let deletedUser = await user.remove();

        deletedUser.password = undefined;
        deletedUser.third_party_auth = undefined;
        res.json(deletedUser, { message: 'Usuário deletado' });
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
