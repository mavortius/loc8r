const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const createError = require('http-errors');
const logger = require('morgan');
require('./app_api/models/db');

const apiRouter = require('./app_api/routes/index');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'app_public', 'build')));

app.use('/api', apiRouter);
app.get('*', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'app_public', 'build', 'index.html'));
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
});

module.exports = app;
