const express = require("express");
const app = express();
const path=require("path");
const mongoose = require("mongoose");
const session = require('express-session');
const User = require("./models/user");
const bodyParser = require("body-parser");

//config
app.set('view engine','hbs');
app.use(express.static(path.join(__dirname,'/public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
var hbs = require('hbs');
hbs.registerPartials(__dirname + '/views/partials', function (err) {
    
});

app.use(session({
  secret: 'opium',
}))
app.use((req, res, next) => {
  res.locals.userLoggedIn = req.session.isLoggedIn || false;
  res.locals.currentuser=req.session.user;
  if(req.session.role=="admin"){
  res.locals.isAdmin=true;
  }

  next();
});
//routers
const loginRoutes = require("./routes/login");
const postRoutes = require("./routes/posts");
const adminRoutes = require("./routes/admin");

app.use("/", loginRoutes);
app.use("/posts", postRoutes);
app.use("/admin", adminRoutes);



mongoose.connect('mongodb://127.0.0.1:27017/session')
    .then(()=>
app.listen(3333,()=>{
    console.log("Server started at port:3333");
})
);