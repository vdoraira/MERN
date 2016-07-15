var MovieList=require('./MovieList');

var GetAllMovies = React.createClass({
  getInitialState:function(){
    return{
      data: null
    };
  },
  loadCommentsFromServer:function(){
    $.ajax({
      url: '/api/movies',
      type:'get',
      dataType: 'json',
      cache: false,
      success: function(movies) {
      //  console.log('---ajax---'+movies);
        this.setState({data: movies});

      }.bind(this),
      error: function(xhr, status, err) {
        console.error('/api/movies', status, err.toString());
      }.bind(this),

      });
  },
  componentDidMount: function() {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, 500);
  },

    render: function(){
         return (
           <MovieList data={this.state.data} />
        );
      }
});

module.exports=GetAllMovies;
