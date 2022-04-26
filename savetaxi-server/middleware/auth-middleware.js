const jwt = require('jsonwebtoken');
const config = require('config');
const jwtConfig = config.get('jwt');

const requireAuth = (req, res, next) => {
    const token = req.headers.jwt;
    if (token) {
        jwt.verify(token, jwtConfig.secret, (err, decodedToken) => {
            if (err) {
                console.log('Invalid token');
                res.status(401).json({ message: 'Invalid token' });
            } else {
                req.decodedToken = decodedToken;
                res.locals.token = decodedToken;
                next();
            }
        });
    } else {
        res.status(401).json({ message: 'No token provided, please login' });
    }
};

module.exports = { requireAuth };
