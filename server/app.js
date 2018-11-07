import logger from 'morgan';
import router from './routes/items.js';
const path = require('path');
const bodyParser = require('body-parser');
const open = require('open');
const mongoose = require('mongoose')
const express = require('express');
const port = process.env.PORT || 5000;
const app = express(); 

app.use(logger('dev'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));

// app.use('/', express.static('dist'));
// app.use('*', express.static('dist'));
const env = process.env.NODE_ENV || 'development';

if (env !== 'test') {
  require('./database/database.js')
}

app.get('/hi', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.use('/api/v1/', router);
// app.use((req, res, next) => console.log("testss"))
// app.use(app.router);
// router.initialize(app);

// app.use('/', express.static('dist'));
// app.use('*', (req, res) => {
//   console.log("Use an arrow function na!!")
// })
// express.static('dist'));

app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    if (process.env.NODE_ENV === 'development') {
      open(`http://localhost:${port}`);
    }
  }
});

export default app;