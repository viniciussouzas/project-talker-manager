const express = require('express');
const { 
  getAllTalkers, 
  getTalkerId, 
  createTalker, 
  updateTalker, 
  deleteTalker, 
  getTalkerByName } = require('../utils/talkerUtils');
const { 
  tokenValidation, 
  nameValidation, 
  ageValidation, 
  talkValidation,
  watchedAtValidation, 
  rateValidation, 
  idValidation } = require('../middlewares/talkerValidation');

const talkerRouter = express.Router();

talkerRouter.get('/', async (req, res) => {
  const response = await getAllTalkers();

  if (!response) {
    return res.status(200).json([]);
  }

  return res.status(200).json(response);
});

talkerRouter.get('/search', tokenValidation, async (req, res) => {
  const { q } = req.query;

  const response = await getTalkerByName(q);

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

talkerRouter.post('/', tokenValidation, nameValidation,
ageValidation, talkValidation, watchedAtValidation, rateValidation, async (req, res) => {
  const newTalker = req.body;
  const response = await createTalker(newTalker);

  res.status(201).json(response);
});

talkerRouter.put('/:id', tokenValidation, nameValidation, ageValidation,
talkValidation, watchedAtValidation, rateValidation, idValidation, async (req, res) => {
  const { id } = req.params;
  const updTalker = req.body;

  const response = await updateTalker(id, updTalker);

  res.status(200).json(response);
});

talkerRouter.delete('/:id', tokenValidation, idValidation, async (req, res) => {
  const { id } = req.params;

  await deleteTalker(id);

  res.status(204).end();
});

module.exports = talkerRouter;