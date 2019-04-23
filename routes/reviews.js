const express = require("express");
const createError = require("http-errors");
const review = require('../model/Reviews');

const Book = require('../model/Book');

const router = express.Router();

router.post("/", async (req, res, next) => {
    const { bookID } = req.body;
    // review
    // .create(req.body)
    // .exec()
    const reviws = new review(req.body);
    const r = await res.send(reviws);
        reviws.save().then(m=>{
        Book.updateOne({ _id: bookID }, { $push: { reviews: m._id } })
        .then()
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