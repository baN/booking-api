var express = require('express'),
   mongoose = require('mongoose'),
   bodyParser = require('body-parser');

var db = mongoose.connect('mongodb://localhost/bookAPI');
var Book = require('./models/bookModel');
var app = express();
var port = process.env.PORT || 3000; //look for port env if not set to 3000

bookRouter = require('./Routes/bookRoutes');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


bookRouter.route('/Books')
  .post(function(req,res){ //add new data
    var book = new Book(req.body); //body parser translates to json

    book.save();
    res.status(201).send(book);
  })
  .get(function(req,res){

     var query = {};

     if (req.query.genre){
       query.genre = req.query.genre;
     }

      Book.find(function(err,books) {
         if(err)
            res.status(500).send(err);
         else
            res.json(books);
      });
   });

bookRouter.route('/Books/:bookId')
  .get(function(req,res){

     Book.findById(req.params.bookId, function(err, book) {
        if(err)
           res.status(500).send(err);
        else
           res.json(book);
     });
  });

app.use('/api', bookRouter);
app.get('/', function(req, res) {
 res.send('Welcome to my API!');
});
app.listen(port, function() {
 console.log('Gulp is running my app on PORT: ' + port);
});
