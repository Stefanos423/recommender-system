var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var movies = require('./movies').movies;
require('array.prototype.find').shim(); // what is this

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "OPTIONS, GET, POST, PUT, PATCH, DELETE");
  next();
});

var port = process.env.PORT || 3000;

var router = express.Router();

router.get('/', function(req, res) {
  res.json({ message: 'hooray! welcome to the movie api!' });
});

router.get('/movies', function(req, res) {
  res.json({ movies });
});

router.post('/movies', function(req, res) {
  const movie = req.body;
  movie.id = movies.length + 1;
  movies.push(movie);
  res.json({ movie })
});

router.get('/movies/:id', function(req, res) {
  res.json({ movie: movies.find((s) => s.id === parseInt(req.params.id))});
});

router.put('/movies/:id', function(req, res) {
  const index = movies.indexOf(movies.find((s) => s.id === req.body.id));
  movies[index] = req.body;
  res.json({ movie: movies[index] });
});

app.use('/api', router);

app.listen(port);
console.log('The magic happens on port ' + port);
