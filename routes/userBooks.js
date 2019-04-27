const express = require("express");
const router = express.Router();
//const userbooks = require("../model/user");
const User = require("../model/user");
const CreateError = require("http-errors");



  router.get("/:userId", (req, res, next) => {
    User.findById(req.params.userId)
    
    .exec()
    .then(user => {
      res.send(user.userbooks);
    })
    .catch(err => {
      next(CreateError(400, err.message));
    });
  });
  router.patch("/:userId/:bookId/:rating", async (req, res, next) => {
    bookrating=req.params.rating
    bookId=req.params.bookId;
    const b=await User.findByIdAndUpdate(req.params.userId,
        {$push: {userbooks: {book:bookId, rating:bookrating,shelve:"want to read"}}} , {safe: true, upsert: true})
    .exec()
        .then(user => {
      res.send(user);
    })
    .catch(err => {
      next(CreateError(400, err.message));
    });
});
  router.patch("/currentlyreading/:userId/:bookId/:rating", async (req, res, next) => {
    bookrating=req.params.rating
    bookId=req.params.bookId;
    const b=await User.findByIdAndUpdate(req.params.userId,
        {$push: {userbooks: {book:bookId, rating:bookrating,shelve:"currently reading"}}} , {safe: true, upsert: true})
    .exec()
        .then(user => {
      res.send(user);
    })
    .catch(err => {
      next(CreateError(400, err.message));
    });
});

router.patch("/read/:userId/:bookId/:rating", async (req, res, next) => {
    bookrating=req.params.rating
    bookId=req.params.bookId;
    const b=await User.findByIdAndUpdate(req.params.userId,
        {$push: {userbooks: {book:bookId, rating:bookrating,shelve:"read"}}} , {safe: true, upsert: true})
    .exec()
        .then(user => {
      res.send(user);
    })
    .catch(err => {
      next(CreateError(400, err.message));
    });
});


//   router.post("/", async (req, res, next) => {
//     const { bookID } = req.body;

//     const reviws = new review(req.body);
//     const r = await res.send(reviws);
//         reviws.save().then(m=>{
//         Book.updateOne({ _id: bookID }, { $push: { reviews: m._id } })
//         .then()
//     })
//     .catch(err => next(createError(400, err.message)));
// });

// router.post("/:userId/:bookId", async (req, res, next) => {
//     bookId=req.params.bookId;
//     User.findByIdAndUpdate(req.params.userId,
//         {$push: {userbooks: {book:bookId}}} , {safe: true, upsert: true})

//         .then(user => {
//       res.send(user);
//     })
//     .catch(err => {
//       next(CreateError(400, err.message));
//     });
// });

module.exports = router;