var React = require('react');
var Navbar = require('./Navbar');
var MovieList = require('./MovieList');
var MovieForm = require('./MovieForm');


//Create Movie Box Component
var MovieBox = React.createClass({
    // Load movie data from Mongo DB.
  /*  loadMoviesFromServer: function(){
        $.ajax({
            url: "http://localhost:8080/api/movies",
            dataType: 'json',
            cache: false,
            success: function(data) {
                this.setState({data: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error("http://localhost:8080/api/movies", status, err.toString());
            }.bind(this)
        });
    },*/
    // Search movie and save in Mongo DB and refresh the movie list
    handleMovieSubmit: function(movie) {
      $.ajax({
     url: "http://www.omdbapi.com/?s="+movie.Title,
     dataType: 'json',
     type: 'GET',
     //data: movie,
     success: function(data) {
       this.setState({data: data.Search});
       }.bind(this),
     error: function(xhr, status, err) {
       console.error("http://www.omdbapi.com/?s=", status, err.toString());
     }.bind(this)
   });
    },
  getInitialState: function() {
        return {data: []};
    },

    componentDidMount: function() {
        this.loadMoviesFromServer();
      ///  setInterval(this.loadMoviesFromServer, 2000);
    },

    render : function(){
        return(

            <div className="movieBox">
            <Navbar />
                <MovieForm onMovieSubmit={this.handleMovieSubmit} />
                <MovieList data={this.state.data}/>

            </div>
        );
    }
});

module.exports = MovieBox ;
