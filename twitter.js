// Inititialize LIRI

// Require Variables
var fs = require("fs");
var keys = require("./keys.js");
var twitter = require("twitter");

// Initialize Variables
var action = process.argv[2];
var value = process.argv[3];
var feed = new twitter(keys.twitterKeys);
var userTwitter = "kmguncc";

// Determine What LIRI is getting asked to do.
switch (action) {
    case 'my-tweets':
        myTweets();
        break;
}

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