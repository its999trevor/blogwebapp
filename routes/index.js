const express=require("express");
const router=express.Router();
const User=require("../models/user.js");
router.get("/", (req, res) => {
    res.render("landing");
  });

  // show login form
router.get("/login", (req, res) => {
  res.render("login");
});


router.post('/login', async (req, res) => {
  const {username,password}=req.body;
  let user=await User.findOne({username:username});   
      if(user){
          if(user.password!=password){
              res.redirect("/login");
             
          }else{
              req.session.isLoggedIn=true;
              req.session.user=user;
            
              res.redirect("/posts");
          }
      }else{
          res.send("no such user found");
      }
   
})

  
  module.exports = router;
