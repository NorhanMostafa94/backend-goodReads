const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//const validator= require('validator');
const bcrypt = require('bcrypt');
const books= require('./Book');
const validateEmail = function(email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};


const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
// bcrypt.hash(myPlaintextPassword, saltRounds)
//   .then(hashedPassword => {
//     debugger
//   })
//   .catch(err => {
//     debugger
//   });


var userSchema = new Schema({

  userId: Schema.Types.ObjectId,

  FirstName: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    index: {
      unique: true
    }
  },
  LastName: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    index: {
      unique: true
    }
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: true,
    validate: [validateEmail, "Please fill a valid email address"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address"
    ]

  },
  password: {
    type: String,
    required: true

  },
  // confirmPassword: {
  //   type: String,
  //   required: true
  // },

  userbooks: {
    type: [{
      book: {
        type: Schema.Types.ObjectId,
        ref: 'Book'
      },
      shelve: {
        type: String,
        enum: ['read', 'currently reading', 'want to read'],
        default: 'want to read'
      },
      rating: {
        type: Number,
        max: 5,
        // min:1
      }
    }],
    default: []
  }

  // default:["5cbf4132aaaab94d94207d25"]


}, {
    autoIndex: true
  });

  const hashPassword= (password)=>{
    bcrypt.hash(password, saltRounds);
  }

userSchema.pre('save', async function () {
  const currentUser = this;
  if (currentUser.isNew) {
    currentUser.password = await hashPassword(currentUser.password)
  }
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;