const express = require('express');
const { getAllTalkers } = require('../utils/talkerUtils');

const talkerRouter = express.Router();

talkerRouter.get('/', async (req, res) => {
  const response = await getAllTalkers();

  if (!response) {
    return res.status(200).json([]);
  }

  return res.status(200).json(response);
});

module.exports = talkerRouter;