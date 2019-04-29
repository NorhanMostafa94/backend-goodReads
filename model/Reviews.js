const mongoose = require('mongoose');
const book = require('./Book');

const ReviewSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {
        type: String
    },
    cover: {
        type: String
    },
    rate: {
        type: Number
    },
    reviewDetails: {
        type: String
    },
    bookID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book'
    },
    //creator:Number,


})
const ReviewModel = mongoose.model('Review', ReviewSchema);
module.exports = ReviewModel;