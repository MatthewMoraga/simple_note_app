// importing express with router for route tracking
const router = require("express").Router();
// importing path
const path = require("path");

// the route that paths the index to the root page
router.get("/", (client_request, server_response) => {
    server_response.sendFile(path.join(process.cwd(), "./public/index.html"))
});

// the route that paths the notes html to /notes and makes the button on the root page
// got to the notes page
router.get("/notes", (client_request, server_response) => {
    server_response.sendFile(path.join(process.cwd(), "./public/notes.html"))
});



// export
module.exports = router;