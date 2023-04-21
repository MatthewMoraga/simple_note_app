// usual package requires
const express = require("express")

// this import contains all of our get, post, push, delete code cycle
const api_routes = require("./routes/api_routes")

// this import contains the code to route the index and notes html files together
const view_routes = require("./routes/view_routes")

// dynamic port to work with Heroku and local for testing
const PORT = process.env.PORT || 3001;
// express app to bring in the express tool set
const app = express();

// the middleware that we will be using to make the app work
app.use(express.json())
app.use(express.urlencoded({ extended: true} ));

// imports the public folder which contains the files
// we show the user in the html
app.use(express.static("public"))

// imports the api_routes file 
app.use(api_routes)
// imports the index.html and notes.html files
app.use(view_routes)

// usual app listen for PORT
app.listen(PORT, () => console.log("listening on port %s", PORT))