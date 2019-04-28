const CreateError = require("http-errors");
const userModel= require('../model/user');
module.exports=async (req,res,next)=>{
    try{
 //check if user sent token
 if (!req.headers.authorization) return next(CreateError(401));
 //check if token is valid
const [,token] = req.headers.authorization.split(' ');
const user = await userModel.verifyToken(token)
if(!user) next(CreateError(401));

//debugger
 //retrieve user

 //attach currentuser to req
 req.user=user;
 //call next 
 next();
}catch(err){
    next(CreateError(401));
}
    }
   