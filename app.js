//Include all required middleware
const express = require("express");
const handlebars = require("express-handlebars").create({defaultLayout: "main"});
const app = express();
const request = require("request");
const bodyParser = require("body-parser");

//Set static file folder, body-parser settings for url and json
app.use(express.static(__dirname + "public"));
app.use(express.urlencoded());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Set view engine to handlebars, set port to 8080
app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");

//Set obj to empty object
var obj = {};

//GET request to change header, display query parameters and values
app.get("/", function(req, res) {
  //Set property to of obj to change h1
  obj.requestType = "GET request received.";
  //Set property to req.query for url get parameters
  obj.property = req.query;
  //render page with obj
  res.render("index", obj);
});

//POST request to change header, display query/body parameters and values
app.post("/", function(req, res) {

  //Set property of obj to change h1
  obj.requestType = "POST request received.";

  //Set separate variable of body to req.body so it can be iterated through for
  // key value pairs
  var body = req.body;

  //Intialize body to an empty object
  obj.body = {};

  //Iterate through all key value pairs of req.body and create them in obj.body
  for(let p in body) {
      obj.body[p] = body[p];
  }

  //Render POST request page with obj
  res.render("index", obj);
});

//Render 404 page if page is not found
app.use(function(req, res) {
  res.status(404);
  res.render("404");
});

//Render 500 error message if server error
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.send('500 - Server Error');
});

//Listen for set port
app.listen(process.env.PORT, process.env.IP);
