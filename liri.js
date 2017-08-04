// Begin White Belt Node.JS Coding
// Inititialize LIRI

// Require Variables
var fs = require("fs");
var keys = require("./keys.js");
var twitter = require('twitter');
var Spotify = require("node-spotify-api");
var request = require("request");

// Initilize Variables

var action = process.argv[2];
var value = process.argv[3];
var userTwitter = "kmguncc";
var client = new twitter(keys.twitterKeys);
var spotify = new Spotify(keys.spotifyKeys);


switch (action) {
    case "my-tweets":
        retrieveTweets();
        break;
    case "spotify-this-song":
        getSong(value);
        break;
    case "movie-this":
        getMovie(value);
        break;
    case "do-what-it-says":
        random();
        break;
}

// Here is where LIRI gets asked what to do

// my-tweets function
function myTweets() {
    feed.get('statuses/user_timeline', userTwitter, function(error, tweets, response) {
        if (!error && response.statusCode == 200) {
            fs.appendFile('log.txt', ('---------- Begin Log Entry ----------\n' + Date() + '\n' + process.argv + '\n \nDATA OUTPUT:\n'), function(err) {
                if (err) throw err;
            });
            console.log(' ');
            console.log('Last 20 Tweets:')
            for (i = 0; i < tweets.length; i++) {
                var number = i + 1;
                console.log(' ');
                console.log([i + 1] + '. ' + tweets[i].text);
                console.log('Created on: ' + tweets[i].created_at);
                console.log(' ');
                fs.appendFile('log.txt', (number + '. Tweet: ' + tweets[i].text + '\nCreated at: ' + tweets[i].created_at + ' \n'), function(err) {
                    if (err) throw err;
                });
            }
            fs.appendFile('log.txt', ('---------- End Log Entry ----------\n \n'), function(err) {
                if (err) throw err;
            });
        }
    });
} // end myTweets function

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

// help me!!!