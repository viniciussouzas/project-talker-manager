const fs = require('fs').promises;
const { join } = require('path');

const readTalkerFile = async () => {
  const path = '../talker.json';

  try {
    const contentFile = await fs.readFile(join(__dirname, path), 'utf-8');

    return JSON.parse(contentFile);
  } catch (error) {
    console.error(error);
  }
};

const writeTalkerFile = async (newTalker) => {
  try {
    await fs.writeFile('src/talker.json', newTalker);
  } catch (error) {
    console.error(error);
  }
};

const getAllTalkers = async () => {
  try {
    const talkers = await readTalkerFile();
    return talkers;
  } catch (error) {
    console.error(error);
  }
};

const getTalkerId = async (id) => {
  try {
    const talkers = await readTalkerFile();

    const findTalker = talkers.find((talker) => talker.id === Number(id));

    return findTalker;
  } catch (error) {
    console.error(error);
  }
};

const createTalker = async (talker) => {
  try {
    const talkers = await getAllTalkers();

    const id = talkers.length + 1;
    const newTalker = { id, ...talker };

    talkers.push(newTalker);

    await writeTalkerFile(JSON.stringify(talkers, null, 2));

    return newTalker;
  } catch (error) {
    console.error(error);
  }
};

const updateTalker = async (id, updTalker) => {
  try {
    const talkers = await getAllTalkers();
    const talkerIndex = talkers.findIndex((talker) => talker.id === Number(id));

    const infoToUpdate = { id: Number(id), ...updTalker };

    talkers[talkerIndex] = infoToUpdate;

    await writeTalkerFile(JSON.stringify(talkers, null, 2));

    return infoToUpdate;
  } catch (error) {
    console.error(error);
  }
};

const deleteTalker = async (id) => {
  try {
    const talkers = await getAllTalkers();

    const talkerIndex = talkers.findIndex((talker) => talker.id === Number(id));

    talkers.splice(talkerIndex, 1);

    await writeTalkerFile(JSON.stringify(talkers, null, 2));
  } catch (error) {
    console.error(error);
  }
};

module.exports = { 
  getAllTalkers,
  getTalkerId,
  writeTalkerFile,
  createTalker,
  updateTalker,
  deleteTalker };