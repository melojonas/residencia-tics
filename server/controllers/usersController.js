import User from '../models/User';
import extend from 'lodash/extend';
import bcrypt from 'bcrypt';

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
    user.password = body.password;
    user.name = body.name || '';
    user.role = body.role || 'discente';

    if (body.password) {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(body.password, salt);
        user.password = hash;
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

export default {
    listUsers,
    createUser,
    getUserById,
    readUser,
    updateUser,
    deleteUser,
};
