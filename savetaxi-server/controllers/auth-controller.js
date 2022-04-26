const jwt = require('jsonwebtoken');
const { Users } = require('../models/users');
const config = require('config');
const jwtConfig = config.get('jwt');

const maxAge = 3 * 24 * 60 * 60 * 1000;

//create token with details and max age
function createToken(id, type) {
    return jwt.sign({ id, type }, jwtConfig.secret, { expiresIn: maxAge });
}

async function login(req, res) {
    try {
        const { username, password } = req.body;

        const user = await tryLogin(username, password);

        if (user instanceof Error) {
            res.status(401).json({
                message: 'Invalid username or password',
            });
        } else {
            const token = createToken(user._id, user.type);
            res.cookie('jwt', token, {
                // httpOnly: true,
                maxAge,
            });
            res.status(201).json({
                userId: user.id,
                username: user.user,
                type: user.type,
            });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function logout(req, res) {
    res.cookie('jwt', '', {
        maxAge: 1,
    });
    res.status(200).json({
        logged_out: true,
    });
}

async function signup(req, res) {
    try {
        const user = {
            user: req.body.username,
            password: req.body.password,
            email: req.body.email,
            fullName: req.body.fullName,
            phone: req.body.phone,
            type: 'user',
        };

        const userExist = await Users.findOne({ user: user.user });
        if (userExist) {
            throw new Error('User already exist');
        }

        const newUser = await Users.create(user);
        await res.status(201).json(newUser);
    } catch (err) {
        await res.status(500).json({
            message: err.message,
            status: 500,
        });
    }
}

async function tryLogin(username, password) {
    const user = await Users.findOne({ user: username, password });

    if (!user) {
        return new Error('Auth error');
    }

    return user;
}

module.exports = {
    login,
    logout,
    signup,
};
