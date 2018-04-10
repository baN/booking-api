var express = require('express'),
    mongoose = require('mongoose');

var app = express();
var db = mongoose.connect('mongodb://localhost/bookAPI');
var Book = require('./models/bookModel'); //translate mongodb to obj

var port = process.env.PORT || 3000; //look for port env if not set to 3000

var bookRouter = express.Router();
bookRouter.route('/Books')
  .get(function(req, res){

    var query = {}; //json filter based on what is returned?
    if (req.query.genre){
      query.genre = req.query.genre;
    }
    Book.find(function(err, books){
      if (err)
        console.log(err);
      else {
        res.json(books);
      }
    })
  })

app.get('/', function (req, res){
  res.send('Welcome to my API');
});

app.listen(port, function() {
  console.log('listening on port' + port);
});
