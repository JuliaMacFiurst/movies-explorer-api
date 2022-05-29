const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const { PORT, DB_URL } = require('./utils');
const routes = require('./routes/index');
const { errorOnServer } = require('./errors/Server');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('./middlewares/cors');
const { limiter } = require('./middlewares/limiter');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(requestLogger);
app.use(cors);
app.use(helmet());
app.use(limiter);
app.use(routes);

app.use(errorLogger);

app.use(errors());

app.use(errorOnServer);

mongoose.connect(DB_URL);

app.listen(PORT);
