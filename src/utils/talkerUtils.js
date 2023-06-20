const fs = require('fs').promises;
const { join } = require('path');

const readTalkerFile = async () => {
  const path = '../talker.json';

  try {
    const contentFile = await fs.readFile(join(__dirname, path), 'utf-8');

    return JSON.parse(contentFile);
  } catch (error) {
    return null;
  }
};

const getAllTalkers = async () => {
  const talkers = await readTalkerFile();

  return talkers;
};

const getTalkerId = async (id) => {
  const talkers = await readTalkerFile();

  const findTalker = talkers.find((talker) => talker.id === Number(id));

  return findTalker;
};

const writeTalkerFile = async (newTalker) => {
  try {
    await fs.writeFile('src/talker.json', newTalker);
  } catch (error) {
    return null;
  }
};

module.exports = { getAllTalkers, getTalkerId, writeTalkerFile };