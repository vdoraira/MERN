var React = require('react');
var Navbar = require('./Navbar');
var ViewMovieList = require('./ViewMovieList');

//Create Movie Box Component
var ViewMovieBox = React.createClass({
    // Load movie data from Mongo DB.
    loadMoviesFromServer: function(){
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
    },

// Delete movie from Mongo DB.
    handleMovieDelete: function(Movieid){
        $.ajax({
            url: "http://localhost:8080/api/movies"+'/'+Movieid,
            data: {"id" : Movieid},
            type: 'DELETE',
            dataType: 'json',
            success: function (data) {
                this.setState({data: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error("http://localhost:8080/api/movies", status, err.toString());
            }.bind(this)
        });
    },
    getInitialState: function() {
        return {data: []};
    },

    componentDidMount: function() {
        this.loadMoviesFromServer();
      setInterval(this.loadMoviesFromServer, 2000);
    },

    render : function(){
        return(
            <div className="movieBox">
              <Navbar />
              console.log(this.state.data);
                <ViewMovieList  onMovieDelete={this.handleMovieDelete} data={this.state.data}/>

            </div>
        );
    }
});

module.exports = ViewMovieBox ;
