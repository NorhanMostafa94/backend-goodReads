const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors= require('cors');
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

// app.options((req,res,next)=>{
//     if(req.method!=='OPTIONS') return next();
//     res.set({
//         "Access-Control-Allow-Origin":'*',
//         "Access-Control-Allow-Methods":"POST",
//         "Access-Control-Allow-Headers":"content-type"
//     });
//     res.end();
// })
app.use(cors());
debugger
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
app.use('/api/users', usersRouter);
app.use('/api/usersbooks', userbooksRouter);
app.use('/api/books', booksRouter);
app.use('/api/reviews', reviewsRouter);
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
