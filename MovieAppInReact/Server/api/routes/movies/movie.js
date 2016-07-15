var express = require('express');
var router = express.Router();
var body=require('body-parser');

var imdbObj = require('node-movie');
var Movie = require('../../../models/movies/movie');

//search and get movie
router.route('/search/:Title')
.get(function(req,res){
    imdbObj(req.params.Title, function (err, data) {
        console.log(req.params.Title);
        if(err){console.log(err);}
        res.send(data);
      })
})


// Route to get all movies and save a movie
router.route('/movies')


// Get all movies
    .get(function(req, res){
      Movie.find(function(err, movies) {
            if (err)
                res.send(err);
            res.json(movies);
        });
    })
// Search and save the movie
  .post(function(req, res) {
    console.log("----search&save---");

        var movie = new Movie();
        movie.Title = req.body.Title;
        movie.Year =  req.body.Year;
        movie.Rated = req.body.Rated;
        movie.Released = req.body.Released;
        movie.Runtime = req.body.Runtime;
        movie.Genre = req.body.Genre;
        movie.Director = req.body.Director;
        movie.Writer = req.body.Writer;
        movie.Actors = req.body.Actors;
        movie.Plot = req.body.Plot;
        movie.Language = req.body.Language;
        movie.Country = req.body.Country;
        movie.Awards = req.body.Awards;
        movie.Poster = req.body.Poster;
        movie.Metascore = req.body.Metascore;
        movie.imdbRating = req.body.imdbRating;
        movie.imdbVotes = req.body.imdbVotes;
        movie.imdbID = req.body.imdbID;
        movie.Type = req.body.Type;
        movie.Response = req.body.Response;
        movie.save(function(err) {
            if (err)
                res.send(err);
            res.json({ message: 'Movie added!' });
              });

  });
// Route to get all movies and save a movie
    router.route('/movies/:movie_id')
// Get the movie by id
          .get(function(req, res) {
            Movie.findById(req.params.movie_id, function(err, movie) {
              console.log('---movie_id---'+req.params.movie_id);
                if (err)
                    res.send(err);
                res.json(movie);
            });
        })
// Update the movie by id
        .put(function(req, res) {
        Movie.findById(req.params.movie_id, function(err, movie) {
            if (err)
                res.send(err);
        
            movie.save(function(err) {
                if (err)
                    res.send(err);
                res.json({ message: 'Movie updated!' });
            });
        });
    })
// Delete the movie by id
    .delete(function(req, res) {
      console.log('---delete---'+req.params.movie_id);
        Movie.remove({
            _id: req.params.movie_id
        }, function(err, movie) {
            if (err)
                res.send(err);
            res.json({ message: 'Successfully deleted' });
        });
    });

module.exports= router;
