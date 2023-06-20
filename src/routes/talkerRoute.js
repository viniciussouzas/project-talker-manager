const express = require('express');
const { getAllTalkers, getTalkerId, writeTalkerFile } = require('../utils/talkerUtils');
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
  const response = await getAllTalkers();

  const id = response.length + 1;

  const newTalker = { id, ...req.body };
  response.push(newTalker);

  await writeTalkerFile(JSON.stringify(response, null, 2));

  res.status(201).json(newTalker);
});

talkerRouter.put('/:id', tokenValidation, nameValidation, ageValidation,
talkValidation, watchedAtValidation, rateValidation, idValidation, async (req, res) => {
  const { id } = req.params;

  const response = await getAllTalkers();

  const talkerIndex = response.findIndex((talker) => talker.id === Number(id));

  const infoToUpdate = { id: Number(id), ...req.body };

  response[talkerIndex] = infoToUpdate;

  await writeTalkerFile(JSON.stringify(response, null, 2));

  res.status(200).json(infoToUpdate);
});

talkerRouter.delete('/:id', tokenValidation, idValidation, async (req, res) => {
  const { id } = req.params;

  const response = await getAllTalkers();

  const talkerIndex = response.findIndex((talker) => talker.id === Number(id));

  response.splice(talkerIndex, 1);

  await writeTalkerFile(JSON.stringify(response, null, 2));

  res.status(204).end();
});

module.exports = talkerRouter;