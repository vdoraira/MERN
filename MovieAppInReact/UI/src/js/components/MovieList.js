var DeleteMovie=require('./DeleteMovie');

var MovieList = React.createClass ({
  getInitialState: function(){
    return(<div></div>)
  },
 render: function (){
   var data=this.props.data;
   //console.log('---MovieList---'+data);
   if(data!=null){
     var out=data.map(function(movie){
       return(

       <div key={movie._id} className='container'>
       <div key={movie._id} className='row well'>
       <div key={movie._id} className="col-md-4">
 <img id="bgposter"  alt={movie.Title} src={movie.Poster} className="img-rounded center-block"/>
 </div>
 <div className="col-md-8">
 <h3>{movie.Title}</h3>
 <h4>Year :{movie.Year} </h4>
 <h4>Actors :{movie.Actors}</h4>
 <h4>Director :{movie.Director}</h4>
 <h4>Description :{movie.Plot}</h4>
 <h4>Language :{movie.Language}</h4>
 <h4>Country :{movie.Country}</h4>
 <h4>Released on :{movie.Released}</h4>
 <h4>ImdbRating :{movie.imdbRating}</h4>
 <h4>Awards :{movie.Awards}</h4>
 <DeleteMovie  movie_id={movie._id}/>
 </div>
 </div>
</div>
    )
  })
}

   return (
     <div>{out}</div>
   );
 }
});

module.exports=MovieList;
