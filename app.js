'use strict'; //necesario siempre para evitar Hoisting

//buena practica => cambiar los var por const o let (let --> puede mutar)
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const index = require('./routes/index');
const users = require('./routes/users');

//practica
const picoyplaca = require('./src/validador/validadorPlaca');
const router = express.Router();
const timeout = require('connect-timeout');
const {routerComentario, isEmpty, createComment, readComment, deleteComment, updateComment, saveUpdatedComment} = require('./src/validador/validadorComentario')
//

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

//practica:
//pico y placa form
app.use('/ppdemo', function(req, res, next){
  res.render('ppform');
})
//comentarios form
app.use('/comdemo', function(req, res, next){
  const algo = [{correo: '', comentario:''}]
  res.render('comform', {comments: algo});
})

// picoyplaca logic
app.use('/validarpp',picoyplaca);

//comments logic 
app.use('/processform/create', routerComentario);
app.use('/delete', function(req, res, next){
  deleteComment(res, req.query.id);
});
app.use('/update', function(req, res, next){
  updateComment(res, req.query.id);
});
app.use('/readcomments', function(req, res, next){
  readComment(req, res, next);
});
app.use('/processform/update', saveUpdatedComment);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;