const express = require("express");
const createError = require("http-errors");
const Book = require('../model/Book');
const categoryModel = require("../model/Category");
const authorModel = require("../model/author");
const reviewModel = require("../model/Reviews");
const router = express.Router();

router.post("/", async (req, res, next) => {
    const { categoryID, authorID } = req.body;
    const book = new Book(req.body);
    await res.send(book);
    let bookId = ""
    await book.save(async function (err, sth) {
        bookId = await book._id;
        await categoryModel.updateOne({ _id: categoryID }, { $push: { books: bookId } })
            .then()
        await authorModel.updateOne({ _id: authorID }, { $push: { books: bookId } })
            .then()
    })
});

// router.post("/", (req, res, next) => {
//     Book
//         .create(req.body)
//         .then(book => res.send(book))
//         .catch(err => next(createError(400, err.message)));
// });

router.get("/", async (req, res, next) => {
    await Book
        .find({}).populate('authorID').populate('categoryID')
        .exec()
        .then(books => res.send(books))
        .catch(err => next(createError(500, err.message)));
});

router.get("/:bookId", async (req, res, next) => {
    await Book.findById(req.params.bookId).populate('reviews').populate('authorID').populate('categoryID')
        .exec()
        .then(book => {
            debugger;
            res.send(book);
            console.log(book.authorID)
        })

        .catch(err => next(createError(404, err.message)));
});

router.delete("/:bookId", async (req, res, next) => {
    await Book.findById({ _id: req.params.bookId })
        .then(book => {
            if (book.reviews.length != 0) {
                book.reviews.map(rev => {
                    reviewModel
                        .findByIdAndDelete(rev)
                        .exec()
                        .then()
                        .catch(err => next(createError(500, err.message)));
                })
            }
        })

    Book.findByIdAndDelete(req.params.bookId, req.body)
        .exec()
        .then(book => {
            res.send(book)
        })
        .catch(err => next(createError(400, err.message)));
});

router.patch("/:bookId", async (req, res, next) => {
    const { categoryID, authorID } = req.body;
    const currentbook = await Book.findById(req.params.bookId);
    if (currentbook.categoryID != categoryID) {
        await categoryModel
            .findById(currentbook.categoryID)
            .then(cat => {
                categoryModel
                    .updateOne({ _id: cat._id }, { books: cat.books.filter((value) => value != req.params.bookId) }, { new: true })
                    .exec()
                    .then(cat => {
                        categoryModel
                            .updateOne({ _id: categoryID }, { $push: { books: req.params.bookId } })
                            .then()
                    })
                    .catch(err => next(createError(400, err.message)))
            });
    }
    if (currentbook.authorID != authorID) {
        await authorModel
            .findById(currentbook.authorID)
            .then(auth => {
                authorModel
                    .updateOne({ _id: auth._id }, { books: auth.books.filter((value) => value != req.params.bookId) }, { new: true })
                    .exec()
                    .then(auth => {
                        authorModel
                            .updateOne({ _id: authorID }, { $push: { books: req.params.bookId } })
                            .then()
                    })
                    .catch(err => next(createError(400, err.message)))

            });
    }
    await Book.updateOne({ _id: req.params.bookId }, req.body, { new: true })
        .exec()
        .then(book => res.send(book))
        .catch(err => next(createError(400, err.message)));
});

module.exports = router;
