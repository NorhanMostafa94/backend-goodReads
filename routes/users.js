const express = require("express");
const router = express.Router();
const User = require("../model/user");
const CreateError = require("http-errors");
const authMiddleware= require('../middlewares/authentication');

//registeration
debugger
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
    debugger
});

//login
debugger
router.post("/login",async function (req,res,next){
  const {firstname,password}= req.body;
  const currentuser = await User.findOne({firstname});
  if (!currentuser) return next (CreateError(401));
  // else {console.log("i found the username");}
  // res.send(currentuser);}
  // debugger
  let passwordMatch= await currentuser.verifyPassword(password);
//debugger
  if (!passwordMatch) return next (CreateError(401));
  // else {console.log("i found the user");
  // res.send(currentuser);}
  const token = await currentuser.generateToken();
  res.send({
    profile:currentuser,
   // currentuser
    token
  })
  debugger
})


// router.use(authMiddleware)



/* GET users listing. */
router.get("/", (req, res, next) => {
  User
    .find({})
    .then(users => res.send(users))
    .catch (err => {
      next(CreateError(500, err.message))
    })
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
  //.exec()
  .then(user => {
    res.send(user);
  })
  .catch(err => {
    next(CreateError(400, err.message));
  });
})



module.exports = router;
