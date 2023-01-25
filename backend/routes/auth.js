const express=require('express');
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const router=express.Router();
var fetchuser = require('../middleware/fetchuser');

const JWT_SECRET="Oh hey wassup bro!"
// Route 1 create user
router.post('/createuser',[
    body('name','Enter a valid name').isLength({ min:  3}),
    body('email','Enter a valid email').isEmail(),
    body('password','Password must be atleast 5 characters').isLength({ min: 5 }),
    ],async (req,res)=>{
      let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      try{
          //check whether user already exist
          let user = await User.findOne({email : req.body.email});
          if(user) {return res.status(400).json({success,error:"sorry user with this email already exist!!!"})}
          const salt = await bcrypt.genSalt(10);
          const secPass = await bcrypt.hash(req.body.password,salt);
          //user create
          user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
          })

          const data={
            user:{
              id:user.id,
            }
          }

          const authToken=jwt.sign(data,JWT_SECRET);
          //console.log(jwtdata);
          success=true;
          res.json({success,authToken});
      }catch(error){
        console.error(error.message);
        res.status(500).send("some error has occured!");
      }

})


//Route 2 authenticate a user
router.post('/login',[
  body('email','Enter a valid email').isEmail(),
  body('password','Password can not be blank').exists(),
  ],async (req,res)=>{
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
    const {email,password}=req.body;
    try{
      let user= await User.findOne({email});
      if(!user) return res.status(400).json({success, error:"Please try to login with correct credentials!"});

      const passwordCompare= await bcrypt.compare(password,user.password);
      if(!passwordCompare) return res.status(400).json({success,error:"Please try to login with correct credentials!"});

      const data={
        user:{
          id:user.id,
        }
      }
      const authToken=jwt.sign(data,JWT_SECRET);
      success = true;
      res.json({ success , authToken });
    }catch(error){
      console.error(error.message);
      res.status(500).send("Internal Server Error!");
    }
  })


// Route 3 Get logged in user login required
router.post('/getuser',fetchuser,async (req,res)=>{
try{
  userId=req.user.id;
  const user=await User.findById(userId).select("-password");
  res.send(user);
}catch(error){
  console.error(error.message);
  res.status(500).send("Internal Server Error!");
}
})

module.exports = router