var express = require("express");
var router = express.Router();
var User = require("../model/user");
var CreateError = require("http-errors");

/* GET users listing. */
router.get("/", (req, res, next) => {
  User
    .find({})
    .then(users => res.send(users))
    .catch (err => {
      next(CreateError(500, err.message))
    })
});

router.post("/", (req, res, next) => {
  // User.create(req.body)
  const user= new User(req.body)
  user
  .save()
    .then(user => {
      res.send(user);
    })
    .catch(err => {
      next(CreateError(400, err.message));
    });
});

router.patch("/:userId",  (req, res, next) => {
  User.findByIdAndUpdate(req.params.userId,req.body,{new:true})
  .then(user => {
    res.send(user);
  })
  .catch(err => {
    next(CreateError(400, err.message));
  });
   
});

router.delete("/:userId",(req,res,next)=>{
  User.findByIdAndDelete(req.params.userId)
  .then(user => {
    res.send(user);
  })
  .catch(err => {
    next(CreateError(400, err.message));
  });
})

router.get("/:userId",(req,res,next)=>{
  User.findById(req.params.userId)
  .exec()
  .then(user => {
    res.send(user);
  })
  .catch(err => {
    next(CreateError(400, err.message));
  });
})


module.exports = router;
