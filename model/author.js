const mongoose = require('mongoose');

const authorScheme = new mongoose.Schema({
    name: {
        type: String
    },
    BD: {
        type: Date,
    },
    website: {
        type: String
    },
    genre: {
        type: String
    },
    cover: {
        // data: Buffer,
        // contentType: String
        type: String
    },
    bio: {
        type: String
    },
    books: {
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Book'
            }
        ],
        default: []
    }
})

const authorModel = mongoose.model('Author', authorScheme);
module.exports = authorModel;