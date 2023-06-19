const crypto = require('crypto');

const generateToken = () => crypto.randomBytes(8).toString('hex');

// const createUser = async () => {

// };

module.exports = { generateToken };