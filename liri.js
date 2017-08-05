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
var feed = new twitter(keys.twitterKeys);
var spotify = new Spotify(keys.spotifyKeys);


switch (action) {
    case "my-tweets":
    case "twitter":
    case "getTweets":
    case "tweets":
        myTweets();
        break;
    case "spotify-this-song":
    case "spotify":
    case "spotify-this":
        getSong(value);
        break;
    case "movie-this":
    case "movieThis":
    case "movie":
        getMovie(value);
        break;
    case "do-what-it-says":
        random();
        break;
}

// Much thanks to Corey in class for helping me out with this code, 
// without him this would not have worked. Much thanks!!!!

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

// spotify function

function getSong(input) {
    fs.appendFileSync("log.txt", ("-------- Log Entry --------\n" + Date() + "\n" + "User used getSong()\n"));
    var valType = "track";
    var song = input;

    if (input == null) {
        song = "The Sign";
    }

    spotify.search({ type: 'track', query: song }, function(err, data) {
        if (err) {
            console.log('Error occurred: ' + err);
            return;
        } else {
            //console.log(JSON.stringify(data, null, 2));
            var response = data.tracks.items[0];
            var artist = response.artists[0].name;
            var title = response.name;
            var album = response.album.name;
            var url = response.preview_url;
            console.log(`${song}`,
                `${artist}`,
                `${title}`,
                `${artist}`,
                `${album}`,
                `${url}`);
        }
        // Do something with 'data' 
    });
} // end getSong()

// movie function
function getMovie(input) {
    fs.appendFile("log.txt", ("-------- Log Entry --------\n" + Date() + "\n" + "User used getMovie()\n"));
    var movie = input;
    if (movie === undefined) {
        movie = "Mr. Nobody";
    }
    request(`http://www.omdbapi.com/?t=${movie}&y=&plot=short&apikey=40e9cece`, function(err, response, body) {
        if (!err && response.statusCode === 200) {
            var data = JSON.parse(body);
            console.log(data);
            var title = data.Title;
            var year = data.Year;
            var rated = data.Rated;
            var ratingLength = data.Ratings.length;
            console.log(ratingLength);
            if (ratingLength === 0) {
                var imdbRating = "Sorry this movie is yet to be rated."
            } else {
                var imdbRating = data.Ratings[0].Value;
                console.log(data.Ratings[0]);
            }
            if (ratingLength > 1) {
                var rottenRating = data.Ratings[1].Value;
            } else {
                var rottenRating = "We were too lazy to even watch this movie.";
            }
            var country = data.Country;
            var language = data.Language;
            var plot = data.Plot;
            var actors = data.Actors;
            var url = data.Website;
            console.log(`Here is the ${movie} you searched for. It is rated: (${rated}) and was released in ${year}. It was released in ${country} in ${language} and featured ${actors}.
                        Here is a quick plot of the film: ${plot}. The critics rated ${title}: IMDB: ${imdbRating} and Rotten Tomatoes: ${rottenRating}
                        To learn more about this film you can visit: ${url}`);
        } // end if()
    }); // end request()
} // end getMovie()

// help me!!!