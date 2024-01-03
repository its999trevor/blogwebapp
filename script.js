const express = require("express");
const app = express();
const path=require("path");
const mongoose = require("mongoose");
const session = require('express-session');
const User = require("./models/user");

//config
const bodyParser = require("body-parser");
app.use(express.static(path.join(__dirname,"static")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
var hbs = require('hbs');
app.set('view engine','hbs');
hbs.registerPartials(__dirname + '/views/partials', function (err) {
    
});

app.use(session({
  secret: 'opium',
}))

//routers
const indexRoutes = require("./routes/index");
const postRoutes = require("./routes/posts");

app.use("/", indexRoutes);
app.use("/posts", postRoutes);



mongoose.connect('mongodb://127.0.0.1:27017/session')
    .then(()=>
app.listen(3333,()=>{
    console.log("Server started at port:3333");
})
);