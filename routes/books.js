const express = require("express");
const createError = require("http-errors");
const Book = require('../model/Book');

const router = express.Router();

router.post("/", (req, res, next) => {
    Book
        .create(req.body)
        .then(book => res.send(book))
        .catch(err => next(createError(400, err.message)));
});

router.get("/", (req, res, next) => {
    Book
        .find({}).populate('authorID').populate('categoryID')
        .exec()
        .then(books => res.send(books))
        .catch(err => next(createError(500, err.message)));
});

router.get("/:bookId", (req, res, next) => {
    Book.findById(req.params.bookId).populate('reviews').populate('authorID').populate('categoryID')
        .exec()
        .then(book => {
            debugger;
            res.send(book);
            console.log(book.authorID)
        })
        
        .catch(err => next(createError(404, err.message)));
});

router.delete("/:bookId", (req, res, next) => {
    User.findByIdAndDelete(req.params.bookId, req.body)
        .exec()
        .then(book => res.send(book))
        .catch(err => next(createError(400, err.message)));
});

router.patch("/:bookId", (req, res, next) => {
    User.update({_id:req.params.bookId}, req.body, { new: true })
      .exec()
      .then(book => res.send(book))
      .catch(err => next(createError(400, err.message)));
  });

module.exports = router;
