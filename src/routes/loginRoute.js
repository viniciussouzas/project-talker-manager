const express = require('express');
const { generateToken } = require('../utils/loginUtils');
const { emailValidation, passwordValidation } = require('../middlewares/loginValidation');

const loginRouter = express.Router();

loginRouter.post('/', emailValidation, passwordValidation, async (req, res) => {
  const randomToken = generateToken();

  res.status(200).json({ token: randomToken });
});

module.exports = loginRouter;