const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const createError = require('http-errors')

require('./db');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var booksRouter = require('./routes/books');  
var reviewsRouter = require('./routes/reviews'); 
var userbooksRouter= require('./routes/userBooks');
const categoryRouter = require('./routes/categories');
var authorsRouter = require('./routes/authors');
const app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/usersbooks', userbooksRouter);
app.use('/books', booksRouter);
app.use('/api/books', booksRouter);
app.use('/reviews', reviewsRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/authors', authorsRouter);

//not found middleware
app.use((req, res, next) => {
    next(createError(404));
})

//error handler
app.use((err, req, res, next) => {
    console.error(err)
    res.status(err.status || 500);
    res.send(err)
})

module.exports = app;
