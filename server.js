// notice : i'm trying to short my code
// i used ECMA script , my function is only one line
// so i can short it to one line code
  /***********************/
 /*   Global Settings   */
/***********************/
const express = require("express"); // start using express
const app = express(); // Start up an instance of app
const cors = require("cors"); // Cross-Origin Resource Sharing
//[bodyParser] used to process data sent through an HTTP request body
const bodyParser = require("body-parser");
const port = 5500; // listen port for localserver

  /**********Start***********/
 /*   LiveReload Package   */
/**************************/
// This package do reload every save automaticly
// start server using [-> npm run watch <-]
const path = require("path");
const livereload = require("livereload");
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, "public"));
const connectLivereload = require("connect-livereload");
app.use(connectLivereload());
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});

  /******Start*******/
 /*   Middleware   */
/******************/
//allows a server to indicate any origins
app.use(cors());
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Initialize the main project folder
app.use(express.static("website"));

  /**************/
 /*   Routes   */
/************ */

// Get Route [/all] with response statues (200) then get projectData object when user request it
// status(200) indicates that the request has succeeded.
app.get("/all", (req, res) => res.status(200).send(projectData));

// Post Route [/add] to add data to the object
app.post("/add", (req, res) => projectData = req.body);

/*****************/
/*   Error 404   */
/*****************/
app.use((req, res) => res.status(404).send("Not Found error [404]"));

  /********************************/
 /*   Create Server Localhost   */
/* *************************** */
app.listen(port, () => console.log(`App Started at : http://localhost:${port}/`));
