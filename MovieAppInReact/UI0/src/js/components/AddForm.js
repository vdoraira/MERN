var React = require('react');
var Navbar = require('./Navbar');

// Add MovieForm
var AddForm = React.createClass({
  getInitialState: function() {
   return {Title: this.props.movieData.props.Title,
           Year: this.props.movieData.props.Year,
           imdbID: this.props.movieData.props.imdbID,
           Poster: this.props.movieData.props.Poster};
  },
 handleTitleChange: function(e) {
   this.setState({Title: e.target.value});
 },
 handleYearChange: function(e) {
   this.setState({Year: e.target.value});
 },
 handleIMDBIDChange: function(e) {
   this.setState({imdbID: e.target.value});
 },
 handlePosterChange: function(e) {
   this.setState({Poster: e.target.value});
 },
 close(){
  console.log('close fun');
 },
 handleSaveMovie: function(e) {
    e.preventDefault();
    //this.props.handleCloseModal();
    var Title = this.state.Title;
    var Year = this.state.Year;
    var imdbID = this.state.imdbID;
    var Poster = this.state.Poster;
    if (!Title || !Year || !imdbID || !Poster) {
        return;
    }
   $.ajax({
    url: "http://localhost:8080/api/movies/add",
    dataType: 'json',
    type: 'POST',
    data: this.state,
    success: function(data) {
      console.log('saved');

    }.bind(this),
    error: function(xhr, status, err) {
      console.error("http://localhost:8080/api/movies/add", status, err.toString());
    }.bind(this)
  });
  //transition.redirect('/login', null, { redirect: transition.path });

  },

  render : function(){
    return(
      <div className="search-form" >
          <h1 className="text-center">Add Movie </h1>
          <form className="form-horizontal" onSubmit={this.handleSaveMovie} >
              <div className="form-group">
                  <input name="Title" type="text" className="form-control" ref="title"
                  placeholder="Enter a Movie Title..." defaultValue={this.props.movieData.props.Title}  onChange={this.handleTitleChange} />
              </div>
              <div className="form-group">
                  <input name="Year" type="text" className="form-control" ref="year"
                  placeholder="Enter a Movie Release Year..." defaultValue={this.props.movieData.props.Year} onChange={this.handleYearChange} />
              </div>
              <div className="form-group">
                  <input name="imdbID" type="text" className="form-control" ref="imdb"
                  placeholder="Enter a Movie IMDB ID..." defaultValue={this.props.movieData.props.imdbID} onChange={this.handleIMDBIDChange} />
              </div>
              <div className="form-group">
                  <input name="Poster" type="text" className="form-control" ref="poster"
                  placeholder="Enter a Movie Poster name..." defaultValue={this.props.movieData.props.Poster} onChange={this.handlePosterChange} />
               </div>
              <input className="btn btn-primary btn-block" type="submit" value="Save" />
                <input className="btn btn-default btn-block" type="button"  data-dismiss="modal"value="Cancel" />
          </form>
      </div>

    );
  }
});

module.exports = AddForm ;
