const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//const validator= require('validator');
const bcrypt = require('bcrypt');
const Book = require('./Book');
const util = require('util');
const jwt = require('jsonwebtoken');

const signPromise = util.promisify(jwt.sign);
const verifyToken = util.promisify(jwt.verify);

const secretKey ='kjkjkjlo';
const validateEmail = function (email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};


const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
//  bcrypt.hash(myPlaintextPassword, saltRounds)
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
    required: true,
    minlength: 3
   // hidden:true
  },
  username: { 
    type: String, 
    unique: true, 
    required: true },
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

}, {
    autoIndex: true,
    toJSON: {
      transform: true
    }
  }
  // {
  //   toJSON: {
  //     transform: true
  //   }
  // }
);

const hashPassword = password => bcrypt.hash(password, saltRounds);

userSchema.method('verifyPassword', function (password) {
  const currentUser = this;
  return bcrypt.compare(password, currentUser.password)
})

userSchema.static('verifyToken' ,async  function(token){
 const userModel=this;
  const decoded = await verifyToken(token,secretKey);
 const userid= decoded._id;
 return userModel.findById(userid);
})

userSchema.method('generateToken', function (){
  const currentUser = this;
  return signPromise({_id:currentUser._id},secretKey,{
    expiresIn:'2h'
  })
});


userSchema.pre('save', async function () {
  const currentUser = this;
  //debugger
  if (currentUser.isNew) {
    currentUser.password = await hashPassword(currentUser.password)
  }
  //debugger
});





const userModel = mongoose.model("User", userSchema);

module.exports = userModel;