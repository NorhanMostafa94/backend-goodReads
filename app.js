const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const createError = require('http-errors')

require('./db');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const booksRouter = require('./routes/books');
const reviewsRouter = require('./routes/reviews');
const categoryRouter = require('./routes/categories');
var authorsRouter = require('./routes/authors');
const app = express();

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, PATCH, DELETE");
    next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/books', booksRouter);
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
