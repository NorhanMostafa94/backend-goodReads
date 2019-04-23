const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/GoodReadsApp',{
    autoIndex:true,
    useNewUrlParser:true,
    useCreateIndex:true
});
