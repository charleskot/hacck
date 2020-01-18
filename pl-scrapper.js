const axios = require('axios');
const cheerio = require('cheerio');

const urls = ['https://twitter.com/policia?lang=en', 'https://twitter.com/kremlinrussia_e?lang=es' , 'https://twitter.com/barackobama', 'https://twitter.com/barackobama', 'https://twitter.com/barackobama' ]
const recoveredTweets = [];


for (url in urls) {
    axios(url)
        .then(response => {
            const html = response.data;
            const $ = cheerio.load(html);
            const tweets = $('.tweet');
            tweets.each(function() {
                const user = $(this).find('.fullname').text();
                const body = $(this).find('.tweet-text').text();
                recoveredTweets.push({
                    user,
                    body
                })
            });
            console.log(recoveredTweets);
        })
        .catch(console.error);




}


