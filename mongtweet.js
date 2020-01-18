var express = require("express"),
    app = express(),
    bodyParser  = require("body-parser"),
    methodOverride = require("method-override");
mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/myproject', function(err, res) {
    if(err) {
        console.log('ERROR: connecting to Database. ' + err);
    } else {
        console.log("Connected to DB");
    }
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

var models = require('./models/tweet')(app, mongoose);
var tweetController = require("./controllers/tweetController");

var router = express.Router();

router.get('/', function(req, res) {
    res.send("Hello World!");
});

app.use(router);

var routes = express.Router();

routes.route("/tweets").get(tweetController.findAllTweets);

app.use("/api", routes);

app.listen(3000, function() {
    console.log("Node server running on http://localhost:3000");
});