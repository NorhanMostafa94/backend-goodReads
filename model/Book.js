const mongoose = require('mongoose');
const reviews = require('./Reviews');
// const author = require('./author')

const BookSchema = new mongoose.Schema({
    bookId:
        mongoose.Schema.Types.ObjectId
    ,
    title: {
        type: String,
        required: true,
        minlength: 3,
    },
    authorID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author'
    },
    categoryID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    cover: {
        type: String,
        required: true,
    },
    avgrating: {
        type: Number,
        required: true,
        default: 0
    },
    rating: {
        type: Number,
        // required: true,
    },
    description: {
        type: String,
        required: true,

    },
    reviews:
    // [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Review'
    // }]
    {
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Review'
            }
        ],
        default: []
    }

})
const BookModel = mongoose.model('Book', BookSchema);
module.exports = BookModel;

