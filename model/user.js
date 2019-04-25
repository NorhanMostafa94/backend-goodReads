var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const validator= require('validator');
const bookSchema= require('./myBook');
var userSchema = new Schema({

    _id: Schema.Types.ObjectId,

    FirstName: {
      type: String,
      required: true,
      unique: true,
      minlength:3,
      index:{
        unique:true
      }
    },
    LastName: {
        type: String,
        required: true,
        unique: true,
        minlength:3,
        index:{
          unique:true
        }
      },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: "Email address is required",
      validate:  validator.isEmail
      
    },
   password:{
    type: String,
    required:true
  
   },
   confirmPassword:{
    type: String,
    required:true
   },


  books: [{ type: Schema.Types.ObjectId, ref: 'book' }]
  
  },{
    autoIndex:true
  });

  const userModel = mongoose.model("User", userSchema);
  
  module.exports = userModel;