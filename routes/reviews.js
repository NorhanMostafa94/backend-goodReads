const express = require("express");
const createError = require("http-errors");
const review = require('../model/Reviews');

const Book = require('../model/Book');

const router = express.Router();

router.post("/",async (req, res, next) => {
    const { bookID } = req.body;
    // review
    // .create(req.body)
    // .exec()
    const reviws = new review(req.body);
    await reviws.save()
        .then(msg => {
        res.send(msg);
        console.log(msg._id)
        // b.reviews.push(msg._id)
        const b = Book.findByIdAndUpdate(bookID,{ $push: { reviews: "5cbf2d5a6892d34f685bc9e4" } })
        console.log(b.reviews)

    })
        .catch(err => next(createError(400, err.message)));
});

router.get("/", (req, res, next) => {
    review
        .find({})
        .exec()
        .then(revws => res.send(revws))
        .catch(err => next(createError(500, err.message)));
});

module.exports = router;