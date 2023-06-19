const express = require('express');
const { generateToken } = require('../utils/loginUtils');

const loginRouter = express.Router();

loginRouter.post('/', async (req, res) => {
  // const { email, password } = req.body;

  const randomToken = generateToken();

  res.status(200).json({ token: randomToken });
});

module.exports = loginRouter;