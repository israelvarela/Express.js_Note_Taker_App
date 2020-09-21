
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.

var { v4: uuidv4 } = require ("uuid");
var fs = require("fs");
const util = require("util")

const readFileAsync = util.promisify(fs.readFile);

// ROUTING

module.exports = function (app) {
    // API GET Requests
    // Below code handles when users "visit" a page.
    // In each of the below cases when a user visits a link
    // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
    // 

    app.get("/api/notes/", function (req, res) {
        fs.readFile ("../db/db.json", "utf8", function(err,data){
            res.json(data);
        });
    });

    // API POST Requests
    // Below code handles when a user submits a form and thus submits data to the server.
    // In each of the below cases, when a user submits form data (a JSON object)
    // ...the JSON is pushed to the appropriate JavaScript array
    // (ex. User fills out a reservation request... this data is then sent to the server...
    // Then the server saves the data to the tableData array)
    // 

    app.post("/api/notes/", function (req, res) {

        fs.readFile("./db/db.json", function (err, data) {
            if (err) throw err;

            let notes = JSON.parse(data);
            let newNote = {
                id: uuidv4(),
                title: req.body.title,
                text: req.body.text
            }

            console.log(notes)
            notes.push(newNote);
            

            fs.writeFile("./db/db.json", JSON.stringify(notes), function (err, data) {
                if (err) throw err;
                res.send(db);
            })
        })
        // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
        // It will do this by sending out the value "true" have a table
        // req.body is available since we're using the body parsing middleware

    });

    app.delete("/api/notes/:id", function (req, res) {
        fs.readFile("./db/db.json", function (err, data) {
            if (err) throw err;

            let notes = JSON.parse(data);
            let newNotes = notes.filter(note => note.id != req.params.id)

            fs.writeFile("./db/db.json", JSON.stringify(newNotes), function (err, data) {
                if (err) throw err;
                res.send(db);
            })
        })

        //   // I added this below code so you could clear out the table while working with the functionality.
        //   // Don"t worry about it!

        //   app.post("/api/clear", function(req, res) {
        //     // Empty out the arrays of data
        //     tableData.length = 0;
        //     waitListData.length = 0;

        //     res.json({ ok: true });
        //   });
    });

};
