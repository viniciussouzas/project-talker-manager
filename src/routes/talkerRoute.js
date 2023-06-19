const express = require('express');
const { getAllTalkers, getTalkerId } = require('../utils/talkerUtils');

const talkerRouter = express.Router();

talkerRouter.get('/', async (req, res) => {
  const response = await getAllTalkers();

  if (!response) {
    return res.status(200).json([]);
  }

  return res.status(200).json(response);
});

talkerRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  const response = await getTalkerId(id);

  if (!response) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }

  return res.status(200).json(response);
});

module.exports = talkerRouter;