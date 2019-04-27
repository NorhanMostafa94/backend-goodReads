const express = require('express');
const createError = require("http-errors");
var router = express.Router();

const Author = require('./../model/author');
const Book = require('../model/Book');


router.post('/', (req, res, next) => {
    const author = new Author(req.body);
    author.save()
        .then(author => res.send(author))
        .catch(err => next(createError(400, err.message)))
});

router.get('/', (req, res, next) => {
    Author.find({}).populate('books')
        .then(author => {
            res.send(author)
            // console.log(author)
        })
        .catch(err => next(createError(400, err.message)))
});

router.get('/:authorId', (req, res, next) => {
    const id = req.params.authorId;
    Author.findById(id).populate('books')
        .then(author => {
            res.send(author)
        })
        .catch(err => next(createError(400, err.message)))
});

router.patch('/:authorId', (req, res, next) => {
    const id = req.params.authorId;
    Author.update({_id:id}, req.body, { new: true })
        .then(author => res.send(author))
        .catch(err => next(createError(400, err.message)))
});

router.delete('/:authorId', (req, res, next) => {
    const id = req.params.authorId;
    Author.findByIdAndDelete(id)
        .then(author => res.send(author))
        .catch(err => next(createError(404, err.message)))
})
 

module.exports = router;