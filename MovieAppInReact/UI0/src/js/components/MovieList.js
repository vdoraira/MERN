var React = require('react');
var Navbar = require('./Navbar');
var Movie = require('./Movie');

//MovieList Component

var MovieList = React.createClass({
    handleDelete: function(Movieid){
        return this.props.onMovieDelete(Movieid);
    },
    render: function() {
        var movieNodes = this.props.data.map(function(movie) {

            return (
                <Movie
                    Title={movie.Title}
                    key={movie.imdbID}
                    Movieid={movie._id}
                    Poster={movie.Poster}
                    Year={movie.Year}
                    imdbID={movie.imdbID}
                  >
                </Movie>
            );
        }.bind(this));
        return (
            <div className="movieList">
                {movieNodes}
            </div>
        );
    }
});

module.exports = MovieList;
