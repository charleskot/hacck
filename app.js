const axios = require('axios');
const cheerio = require('cheerio');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url1s = ['https://twitter.com/policia?lang=en', 'https://twitter.com/kremlinrussia_e?lang=es' , 'https://twitter.com/barackobama', 'https://twitter.com/barackobama', 'https://twitter.com/barackobama' ]
const recoveredTweets = [];

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'myproject';

// Create a new MongoClient
const client = new MongoClient(url);

// Use connect method to connect to the Server
client.connect(function(err) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    const db = client.db(dbName);
    const collection = db.collection('twit');

    scrap(collection);


});


function scrap(collection) {
    for (url1 of url1s) {
      axios(url1)
        .then(response => {
            const html = response.data;
            const $ = cheerio.load(html);
            const tweets = $('.tweet');
            tweets.each(function() {
                const user = $(this).find('.fullname').text();
                const body = $(this).find('.tweet-text').text();
                collection.insertOne({user,body});
                recoveredTweets.push({
                    user,
                    body,
                })
            });
            console.log(recoveredTweets);
        })
        .catch(console.error);

}
}
