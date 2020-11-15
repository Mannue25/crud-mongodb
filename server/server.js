const express = require("express");
const bodyParser = require("body-parser");
const port = require("./config/config");
const mongoose = require("mongoose");
const app = express();

// Middleware body parser

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(require('./routes/usuario'))

mongoose.connect(process.env.URLDB 
  ,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  },
  (err, res) => {
    if (err) throw err;
    console.log("Base de datos Online");
  }
);

app.listen(port);
