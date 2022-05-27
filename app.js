const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { PORT, DB_URL } = require('./utils');
const routes = require('./routes/index');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(routes);

async function main() {
  console.log('Try to connect to MongoDB');
  await mongoose.connect(DB_URL);
  console.log('Connected');

  app.listen(PORT, () => {
    console.log(`Server listen on ${PORT}`);
  });
}

main();
