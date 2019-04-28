const express = require("express");
const router = express.Router();
const User = require("../model/user");
const CreateError = require("http-errors");
const authMiddleware= require('../middlewares/authentication');

//registeration

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

//login
router.post("/login",async function (req,res,next){
  const {username,password}= req.body;
  const currentuser = await User.findOne({username});
  if (!currentuser) return next (CreateError(401));
  // else {console.log("i found the username");}
  // res.send(currentuser);}
  //debugger
  let passwordMatch= await currentuser.verifyPassword(password);
//debugger
  if (!passwordMatch) return next (CreateError(401));
  // else {console.log("i found the user");
  // res.send(currentuser);}
  const token = await currentuser.generateToken();
  res.send({
    profile:currentuser,
    token
  })
})

// router.use(authMiddleware)



/* GET users listing. */
router.get("/",authMiddleware, (req, res, next) => {
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
