const mongoose = require("mongoose");
const dbURL = process.env.MONGO_URL || "mongodb://localhost:27017/GoodReadsApp";
// "mongodb+srv://DB-GoodReads:1234@cluster0-92so5.mongodb.net/test?retryWrites=true";

mongoose.connect(dbURL, {
  autoIndex: true,
  useNewUrlParser: true,
  useCreateIndex: true
});
