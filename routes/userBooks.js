const express = require("express");
const router = express.Router();
//const userbooks = require("../model/user");
const User = require("../model/user");
const CreateError = require("http-errors");


const Book = require('./../model/Book');

router.get("/:userId", (req, res, next) => {
  User.findById(req.params.userId).populate({
    path: 'userbooks.book',
    populate: {
      path: 'authorID',
      model: 'Author'
    }
  })

    .exec()
    .then(user => {

      res.send(user.userbooks);
    })
    .catch(err => {
      next(CreateError(400, err.message));
    });
});

router.get("/read/:userId", (req, res, next) => {
  User.findById(req.params.userId).populate({
    path: 'userbooks.book',
    populate: {
      path: 'authorID',
      model: 'Author'
    }
  })
    .exec()
    .then((user) => {
      let readBooks = [];
      const userBook = user.userbooks
      userBook.forEach(book => {
        console.log(userBook.shelve);
        if (book.book != null && book.shelve === 'read')
          readBooks.push(book);
      });
      res.send(readBooks);
    })
    .catch(err => {
      next(CreateError(400, err.message));
    });
});

router.get("/currentlyreading/:userId", (req, res, next) => {
  User.findById(req.params.userId).populate({
    path: 'userbooks.book',
    populate: {
      path: 'authorID',
      model: 'Author'
    }
  })
    .exec()
    .then((user) => {
      const currReading = [];
      const userBooks = user.userbooks;
      userBooks.forEach(book => {
        if (book.book != null && book.shelve === 'currently reading')
          currReading.push(book);
      });
      res.send(currReading);
    })
    .catch(err => {
      next(CreateError(400, err.message));
    });
});

router.get("/wantToRead/:userId", (req, res, next) => {
  User.findById(req.params.userId).populate({
    path: 'userbooks.book',
    populate: {
      path: 'authorID',
      model: 'Author'
    }
  })
    .exec()
    .then((user) => {
      const currReading = [];
      const userBooks = user.userbooks;
      userBooks.forEach(book => {
        if (book.book != null && book.shelve === 'want to read')
          currReading.push(book);
      });
      res.send(currReading);
    })
    .catch(err => {
      next(CreateError(400, err.message));
    });
});


//for testing rating
router.patch("/rating/:userId/:bookId/:rating", async (req, res, next) => {
  debugger;
  bookrating = req.params.rating
  const { avgrating } = await Book.findById(req.params.bookId)
  // console.log(avgrating)
  const users = await User.find({ 'userbooks.book': req.params.bookId })
  const b = [];
  const a = users.map(i => i.userbooks.filter(i => i.book == req.params.bookId)).map(r => r.map(rr => { b.push(rr.rating) }))
  console.log(b)
  const c = b.reduce(function (agg, val) {
    return agg += val;

  }, 0)
  console.log(c)
  User.update({ 'userbooks.book': req.params.bookId }
    , {
      '$set': {
        'userbooks.$.rating': bookrating
      }
    }
  )
    .then(user => {
      res.send(user);
      Book.updateOne({_id:req.params.bookId},{avgrating:c/b.length})
      .then()
    })
    .catch(err => {
      next(CreateError(400, err.message));
    });
})

//// change vook shelve
router.patch("/:userId/:bookId/:shelve",async (req,res,next)=>{
  shelve = req.params.shelve
  bookId = req.params.bookId;
  User.update({ 'userbooks.book': req.params.bookId }
    , {
      '$set': {
        'userbooks.$.shelve': shelve
      }
    }
  )
.exec()
    .then(user => {
      res.send(user);
    })
    .catch(err => {
      next(CreateError(400, err.message));
    });
})

router.patch("/:userId/:bookId/:rating", async (req, res, next) => {
  bookrating = req.params.rating
  bookId = req.params.bookId;
  const b = await User.findByIdAndUpdate(req.params.userId,
    { $push: { userbooks: { book: bookId, rating: bookrating, shelve: "want to read" } } }, { safe: true, upsert: true })
    .exec()
    .then(user => {
      res.send(user);
    })
    .catch(err => {
      next(CreateError(400, err.message));
    });
});
router.patch("/currentlyreading/:userId/:bookId", async (req, res, next) => {
  bookrating = req.params.rating
  bookId = req.params.bookId;
  const b = await User.findByIdAndUpdate(req.params.userId,
    { $push: { userbooks: { book: bookId, rating: bookrating, shelve: "currently reading" } } }, { safe: true, upsert: true })
    .exec()
    .then(user => {
      res.send(user);
    })
    .catch(err => {
      next(CreateError(400, err.message));
    });
});

router.patch("/read/:userId/:bookId/:rating", async (req, res, next) => {
  bookrating = req.params.rating
  bookId = req.params.bookId;
  const b = await User.findByIdAndUpdate(req.params.userId,
    { $push: { userbooks: { book: bookId, rating: bookrating, shelve: "read" } } }, { safe: true, upsert: true })
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