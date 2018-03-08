'use strict'; //necesario siempre para evitar Hoisting

//buena practica => cambiar los var por const o let (let se puede mutar)

const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const index = require('./routes/index');
const users = require('./routes/users');

//practica
const picoyplaca = require('./public/javascripts/validador/validadorPlaca')
const router = express.Router();
const timeout = require('connect-timeout');
const testbdd = require('./public/javascripts/control/bddcon');
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

//pico y placa 
app.use(timeout(1000)); //1 segundo
app.use('/validador',picoyplaca);
app.use('/testbdd', testbdd);

app.use('/demo', function (req, res, next) {
  console.log('from form...')
  const aux = req.body.placaIn;
  if(aux.length !== 8){
    const err = new Error('Error de longitud');
    err.status = 400;
    next(err);
  } else{
    console.log("else")
    //res.sendFile(path.join(__dirname+'/views/main.html'));
    res.locals.placaver = 'A: '+ req.body.placaIn;
    res.render('ppform');
    console.log('....');
  }
})

app.use('/mainpp', function(req, res, next){
  console.log('Redireccion a:');
  //res.sendFile(path.join(__dirname+'/views/main.html'));
  res.render('ppform');
})

app.post('/processform', function(req, res, next){
  console.log('Form: '+ req.query.form);
  console.log('Email:'+ req.body.email);
  console.log('Comentario:' + req.body.coment);
  //res.send('<p>some html</>'); //no es util ni necesario
  res.locals.emailarm = 'CORREO:'+req.body.email;
  res.render('ppform');
})

router.get('/views/:id', function (req, res, next) {
  let id = req.params.id;
  Post.findById(id, function (err, post) {
    if(err) {
      next(err);
    }
    console.log(post);
    return res.render("post", {post: post})
  })
})
//

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
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