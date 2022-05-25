const express = require('express');
const mongoose = require('mongoose');
const NOT_FOUND = require('./errors/NotFound');
const { PORT, DB_URL } = require('./utils');

const app = express();

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});

mongoose.connect(DB_URL);
