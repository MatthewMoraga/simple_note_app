
// importing express with route tracking
// importing uuid to generate unique ids using the v4() generator 
// import for fs
const router = require("express").Router();
const uuid = require("uuid");
const fs = require("fs");

// setting up with an async function that gets the data from db.json depending on what the app wants to do
// this route gets the current note data on the notes page depending on client input
// const dbjson is for getting the data from db.json and executing a function based client input
// sending back the client the dbjson data based on client input
router.get("/api/notes", async (client_request, server_response) => {
    const dbJson = await JSON.parse(fs.readFileSync("db/db.json","utf8"));
    server_response.json(dbJson);
});

// when the client sends a post request the post sends back the dbjson data
// const userInput takes the data from dbjson from the above response and sets it up as an object literal
// the object literal userInput gets the data of the title and text and sets it up so that it can be changed based on user input
// furthermore a random unique id is generated so that it can be sorted
// dbjson.push is where the client pushes up their input based on the values from the userInput object literal
// WriteFileSunc is were the file gets written saved to column on the left and a new object is added to the array 
// this response back lets the client see their notes that they have saved
router.post("/api/notes", (client_request, server_response) => {
    const dbJson = JSON.parse(fs.readFileSync("db/db.json", "utf8"));
    const userInput = {
        title: client_request.body.title,
        text: client_request.body.text,
        id: uuid.v4()
    };
    dbJson.push(userInput);
    fs.writeFileSync("db/db.json",JSON.stringify(dbJson));
    server_response.json(dbJson);
});

// delete was interesting to research
// the delete route takes the data from :id which is stored in the /notes path
// we let data here cause the data will be different every time user deletes data from dbjson
// this new const gets the data from the let data we just made and parses it so that we can filter out the ids
// newNote now becomes a new note staged to be deleted 
// filter is set to note so we can set a specific filter
// return here is set so that note is set to id which is given logic to only check for the unique ids
// and not text or title
// params is used here so that it checks the client_request data for all unique ids
// the writeFile here overwrites the unique id with itself so that only that specific note is deleted
// and finally the client gets a response back after deletion
router.delete("/api/notes/:id", (client_request, server_response) => {
    let data = fs.readFileSync("db/db.json", "utf8");
    const dataJSON = JSON.parse(data);
    const newNote = dataJSON.filter((note) => {
        return note.id !== client_request.params.id;
    });
    fs.writeFileSync("db/db.json",JSON.stringify(newNote));
    server_response.json("yeeted and deleted");
});

module.exports = router;