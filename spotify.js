var fs = require("fs");
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var request = require("request");

var action = process.argv[2];
var value = process.argv[3];
var spotify = new Spotify(keys.spotifyKeys);
for (var i = 3; i === action.length; i++) {
    value = value + " " + action[i];
}

switch (action) {
    case "spotify-this-song":
        getSong(value);
        break;
}

// spotifyThis function
function getSong(value) {
    fs.appendFile('log.txt', ('---------- Log Entry ----------\n' + Date() + '\n' + process.argv + '\n \nUsed getSong()\n'));
    var valType = "track";
    var song = value;
    // if null goes to the sign as default
    if (value === null) {
        value = "The Sign";
    }

    spotify.search({ type: "track", query: value }, function(err, data) {
        // ('https://api.spotify.com/v1/search?q=' + value + '&type=track', function(error, response, body) {
        if (!error && response.statusCode == 200) {
            jsonBody = JSON.parse(body);
            console.log(' ');
            console.log('Artist: ' + jsonBody.tracks.items[0].artists[0].name);
            console.log('Song: ' + jsonBody.tracks.items[0].name);
            console.log('Preview Link: ' + jsonBody.tracks.items[0].preview_url);
            console.log('Album: ' + jsonBody.tracks.items[0].album.name);
            console.log(' ');
            fs.appendFile('terminal.log', ('=============== LOG ENTRY BEGIN ===============\r\n' + Date() + '\r\n \r\nTERMINAL COMMANDS:\r\n$: ' + process.argv + '\r\n \r\nDATA OUTPUT:\r\n' + 'Artist: ' + jsonBody.tracks.items[0].artists[0].name + '\r\nSong: ' + jsonBody.tracks.items[0].name + '\r\nPreview Link: ' + jsonBody.tracks.items[0].preview_url + '\r\nAlbum: ' + jsonBody.tracks.items[0].album.name + '\r\n=============== LOG ENTRY END ===============\r\n \r\n'), function(err) {
                if (err) throw err;
            });
        }
    });
} // end spotifyThis function