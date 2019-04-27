const express = require("express");
const createError = require("http-errors");
const categoryModel = require('../model/Category');
const router = express.Router();

//Get All Categories
router.get("/", (req, res, next) => {
    categoryModel
        .find({})
        .exec()
        .then(catg => res.send(catg))
        .catch(err => next(createError(500, err.message)));
});

//create category
router.post("/", async function (req, res, next) {
    categoryModel
        .create(req.body)
        .then(category => {
            res.end(JSON.stringify(category));
        })
        .catch(err => {
            console.log(err);
            next(createError(400, err.message));
        });
});

//get one category by Id
router.get("/:categoryId", (req, res, next) => {
    categoryModel
        .findById(req.params.categoryId).populate('books')
        .exec()
        .then(category => {
            res.send(category);
        })
        .catch(err => next(createError(404, err.message)));
});

//get the books assigned to category
router.get("/books/:categoryName", async (req, res, next) => {
    categoryModel
        .findOne({ Name: req.params.categoryName }).populate('Books')
        .exec()
        .then(category => res.send(category))
        .catch(err => next(createError(404, err.message)));
});

//update category details
router.patch("/:categoryId", (req, res, next) => {
    categoryModel
        .findByIdAndUpdate(req.params.categoryId, req.body, { new: true })
        .exec()
        .then(category => res.send(category))
        .catch(err => next(createError(500, err.message)));
});

//delete category
router.delete("/:categoryId", (req, res, next) => {
    categoryModel
        .findByIdAndUpdate(req.params.categoryId, { isDeleted: true })
        .exec()
        .then(category => res.send(category))
        .catch(err => next(createError(500, err.message)));
});

module.exports = router;