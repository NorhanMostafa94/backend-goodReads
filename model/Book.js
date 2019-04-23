const mongoose = require('mongoose');
const reviews = require('./Reviews');
// const author = require('./author')
// const category = require('./category');
const BookSchema = new mongoose.Schema({
    bookId:
        mongoose.Schema.Types.ObjectId
    ,
    title: {
        type: String,
        required: true,
        minlength: 3,
    },
    // authorID: {
    //     type: Schema.Types.ObjectId,
    //      ref: author
    // },
    // categoryID: {
    //     type: Schema.Types.ObjectId,
    //     ref: category
    // },
    cover: {
        type: String,
        // required: true,
    },
    avgrating: {
        type: Number,
        required: true,
    },
    rating: {
        type: Number,
        required: true,

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
        default:["5cbf4132aaaab94d94207d25"]
    }



})
const BookModel = mongoose.model('Book', BookSchema);
module.exports = BookModel;

