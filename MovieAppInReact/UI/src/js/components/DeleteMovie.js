var DeleteMovie = React.createClass ({
  delete:function(e){
    var deleteConfirm=confirm('Are you sure want to delete ?');
    if(deleteConfirm){
    $.ajax({
        url: '/api/movies/'+this.props.movie_id,
        type:'delete',
        dataType: 'json',
        cache: false,
        success: function(e) {
        //  console.log('---ajax---');
          }

        });
      }
  },
 render: function (){
   return (
  <form onClick={this.delete}>
  <button className="btn btn-danger" type="button" value={this.props.movie_id} name="movie_id">Delete</button>
  </form>
  );
 }
});

module.exports=DeleteMovie;
