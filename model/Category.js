const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    categoryId:
        mongoose.Schema.Types.ObjectId,

    name: {
        type: String,
        required: true,
        minlength: 3,
        unique: true
    },
    isDeleted: {
        type: Boolean,
        default: false
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
});

const CategoryModel = mongoose.model('Category', categorySchema);
module.exports = CategoryModel;