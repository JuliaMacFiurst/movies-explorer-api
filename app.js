const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { PORT, DB_URL } = require('./utils');
const routes = require('./routes/index');
const { errorOnServer } = require('./errors/Server');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('./middlewares/cors');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(requestLogger);
app.use(cors);

app.use(routes);

app.use(errorLogger);

app.use(errors());

app.use(errorOnServer);

async function main() {
  console.log('Try to connect to MongoDB');
  await mongoose.connect(DB_URL);
  console.log('Connected');

  app.listen(PORT, () => {
    console.log(`Server listen on ${PORT}`);
  });
}

main();
