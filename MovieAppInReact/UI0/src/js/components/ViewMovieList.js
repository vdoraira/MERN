var React = require('react');
var ViewMovie = require('./ViewMovie');

//ViewMovieList Component

var ViewMovieList = React.createClass({
    handleDelete: function(Movieid){
        return this.props.onMovieDelete(Movieid);
    },
    render: function() {
        var movieNodes = this.props.data.map(function(movie) {

            return (
                <ViewMovie
                    Title={movie.Title}
                    key={movie.imdbID}
                    Movieid={movie._id}
                    Poster={movie.Poster}
                    Year={movie.Year}
                    imdbID={movie.imdbID}
                    onDelete = {this.handleDelete}
                >
                </ViewMovie>
            );
        }.bind(this));
        return (
            <div className="movieList">
                {movieNodes}
            </div>
        );
    }
});

module.exports = ViewMovieList;
