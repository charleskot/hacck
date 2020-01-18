//File: controllers/tvshows.js
var mongoose = require('mongoose');
var tweet  = mongoose.model('twit');

var Sentiment = require('sentiment');
var sentiment = new Sentiment();

//GET - Return all tvshows in the DB
exports.findAllTweets = function(req, res) {
    tweet.find(function(err, tweets) {
        if(err) res.send(500, err.message);
        console.log('GET /tweets');
        res.status(200).jsonp(addSentiment(tweets));
    });
};

function addSentiment(tweets) {
    return tweets.map(tweet => {
        var result = sentiment.analyze(tweet.body).score;
        var empji = "";
        if (result > 0) {
            empji = ":)🙁🙁";
        } else {
            empji = "🙁🙁🙁️😤😤🙁:(";
        }
        return {tweet: tweet.body, user: tweet.user, sentiment: result, emoji: empji};
    })



}