exports = module.exports = function (app, mongoose) {
    var tweetSchema = new mongoose.Schema({
        user:    { type: String },
        body:     { type: String },
    }, {collection: "twit"});
    mongoose.model('twit', tweetSchema);
};

