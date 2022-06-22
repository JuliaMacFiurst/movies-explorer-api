require('dotenv').config();

const {
  PORT = 3001,
  DB_URL = 'mongodb://localhost:27017/bitfilmsdb',
  NODE_ENV,
  JWT_SECRET,
} = process.env;

const SALT_ROUNDS = 10;

module.exports = {
  PORT,
  DB_URL,
  NODE_ENV,
  JWT_SECRET,
  SALT_ROUNDS,
};
