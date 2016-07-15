var { Router, Route, IndexRoute, Link, browserHistory }=ReactRouter

var NavigationBar=React.createClass({
  render:function()
  {return(
    <div className="navbar navbar-fixed-top navbar-default mynav">
        <div className="container ">
          <div className=" navbar-collapse collapse navbar-responsive-collapse">
          <ul className="nav navbar-nav ">
                <li className=""><Link to="/home" >Home</Link></li>
                <li><Link to="/movies">Movie</Link></li>
                <li><Link to="/searchAndSave">Add Movie</Link></li>
          </ul>
          </div>
          </div>
      </div>
    );
  }
});

var MainLayout=React.createClass({
  render:function()
  {
    return(
    <div className="container" id="main">
      <NavigationBar />
      <main>
        {this.props.children}
      </main>
    </div>
  );
  }
});


var Home=React.createClass({
  render:function(){
    return(
    <div><h4>You are in Home</h4>
    <h3> Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</h3>

    </div>)
  }
});

var SearchAndSave=React.createClass({
  render:function(){
    return(<div><h4>You are in Seach and save</h4>
    
    </div>)
  }
});

var SearchMovie=React.createClass({
  getInitialState: function(){
    return {
      name:'',
      data:{},
      msg:''
    }
  },

 handleSubmit:function(){

   //alert(this.props.data.Year);
   $.ajax({
       url: '/api/movies/',
       type:'post',
       data:$('#saveMovie').serialize(),
       cache: false,
       success: function(data) {
    //       console.log('---moviedata---'+data);

         }.bind(this)

       });
       this.setState({msg: 'Movie Added Successfully'}),
       this.setState({data: {}})

 },
  submit: function (e){
    var self
    e.preventDefault()
    self = this

  //  alert(this.state.name);
    $.ajax({
        url: '/api/search/'+this.state.name,
        type:'get',
        cache: false,
        success: function(data) {

            this.setState({data:data});
          //  console.log('---moviedata---'+data);

          }.bind(this)

        })
    .fail(function(fail) {
      console.log('failed to register');
    });

  },

  clearForm: function() {
    this.setState({
      name: "",
    });
  },

  nameChange: function(e){
    this.setState({name: e.target.value})
    //this.setState({msg: 'Please Enter A Movie Title'})
  },
render: function (){
     return (
       <div className="container col-md-12">
       <div className=" row well" >
       <form onSubmit={this.submit} >
        <div className='searchBar'>
        <BasicInputBox label="Name:" valChange={this.nameChange} val={this.state.name}/>
        <button type="submit" className='form-control btn-info'>Search</button>
        </div>
        </form>
       </div>
       {this.state.data.Title!=undefined ? <form id="saveMovie">
           <div className={'form-group row'}>
              <label for="title" className={'col-sm-6 form-control-label'}>Title: </label>
              <div className={'col-sm-6 title'}>
                 <input type="text" className={'form-control input-tag'} name="Title" defaultValue={this.state.data.Title} required="required"/>
              </div>
            </div>
           <div className={'form-group row'}>
              <label for="releasedate" className={'col-sm-6 form-control-label'}>Year: </label>
              <div className={'col-sm-6 date'}>
                 <input type="number" className={'form-control input-tag'} name="Year" defaultValue={this.state.data.Year} required="required"/>
              </div>
           </div>

           <div className={'form-group row'}>
              <label for="director" className={'col-sm-6 form-control-label'}>Release Date: </label>
              <div className={'col-sm-6 director'}>
                 <input type="text" className={'form-control input-tag'} name="Released" defaultValue={this.state.data.Released} required="required"/>
              </div>
           </div>
           <div className={'form-group row'}>
              <label for="actors" className={'col-sm-6 form-control-label'}>Runtime: </label>
              <div className={'col-sm-6 actors'}>
                 <input type="text" className={'form-control input-tag'} name="Runtime" defaultValue={this.state.data.Runtime} required="required"/>
              </div>
           </div>
           <div className={'form-group row'}>
              <label for="actors" className={'col-sm-6 form-control-label'}>Genre: </label>
              <div className={'col-sm-6 actors'}>
                 <input type="text" className={'form-control input-tag'} name="Genre" defaultValue={this.state.data.Genre} required="required"/>
              </div>
           </div>
           <div className={'form-group row'}>
              <label for="actors" className={'col-sm-6 form-control-label'}>Director: </label>
              <div className={'col-sm-6 actors'}>
                 <input type="text" className={'form-control input-tag'} name="Director" defaultValue={this.state.data.Director} required="required"/>
              </div>
           </div>
           <div className={'form-group row'}>
              <label for="actors" className={'col-sm-6 form-control-label'}>Writer: </label>
              <div className={'col-sm-6 actors'}>
                 <input type="text" className={'form-control input-tag'} name="Writer" defaultValue={this.state.data.Writer} required="required"/>
              </div>
           </div>
           <div className={'form-group row'}>
              <label for="actors" className={'col-sm-6 form-control-label'}>Actors: </label>
              <div className={'col-sm-6 actors'}>
                 <input type="text" className={'form-control input-tag'} name="Actors" defaultValue={this.state.data.Actors} required="required"/>
              </div>
           </div>
           <div className={'form-group row'}>
              <label for="about" className={'col-sm-6 form-control-label'}>Plot: </label>
              <div className={'col-sm-6 about'}>
                 <textarea className={'form-control input-tag'} name="Plot" defaultValue={this.state.data.Plot} rows="5" cols="10">
                 </textarea>
              </div>
           </div>
           <div className={'form-group row'}>
              <label for="actors" className={'col-sm-6 form-control-label'}>Language: </label>
              <div className={'col-sm-6 actors'}>
                 <input type="text" className={'form-control input-tag'} name="Language" defaultValue={this.state.data.Language} required="required"/>
              </div>
           </div>
           <div className={'form-group row'}>
              <label for="actors" className={'col-sm-6 form-control-label'}>Country: </label>
              <div className={'col-sm-6 actors'}>
                 <input type="text" className={'form-control input-tag'} name="Country" defaultValue={this.state.data.Country} required="required"/>
              </div>
           </div>
           <div className={'form-group row'}>
              <label for="actors" className={'col-sm-6 form-control-label'}>Awards: </label>
              <div className={'col-sm-6 actors'}>
                 <input type="text" className={'form-control input-tag'} name="Awards" defaultValue={this.state.data.Awards} required="required"/>
              </div>
           </div>
           <div className={'form-group row'}>
              <label for="actors" className={'col-sm-6 form-control-label'}>Poster: </label>
              <div className={'col-sm-6 actors'}>
                 <input type="text" className={'form-control input-tag'} name="Poster" defaultValue={this.state.data.Poster} required="required"/>
              </div>
           </div>
           <div className={'form-group row'}>
              <label for="actors" className={'col-sm-6 form-control-label'}>Metascore: </label>
              <div className={'col-sm-6 actors'}>
                 <input type="text" className={'form-control input-tag'} name="Metascore" defaultValue={this.state.data.Metascore} required="required"/>
              </div>
           </div>
           <div className={'form-group row'}>
              <label for="actors" className={'col-sm-6 form-control-label'}>IMDB rating: </label>
              <div className={'col-sm-6 actors'}>
                 <input type="text" className={'form-control input-tag'} name="imdbRating" defaultValue={this.state.data.imdbRating} required="required"/>
              </div>
           </div>
           <div className={'form-group row'}>
              <label for="actors" className={'col-sm-6 form-control-label'}>IMDB Votes: </label>
              <div className={'col-sm-6 actors'}>
                 <input type="text" className={'form-control input-tag'} name="imdbVotes" defaultValue={this.state.data.imdbVotes} required="required"/>
              </div>
           </div>
           <div className={'form-group row'}>
              <label for="actors" className={'col-sm-6 form-control-label'}>IMDB ID: </label>
              <div className={'col-sm-6 actors'}>
                 <input type="text" className={'form-control input-tag'} name="imdbID" defaultValue={this.state.data.imdbID} required="required"/>
              </div>
           </div>
           <div className={'form-group row'}>
              <label for="actors" className={'col-sm-6 form-control-label'}>Type: </label>
              <div className={'col-sm-6 actors'}>
                 <input type="text" className={'form-control input-tag'} name="Type" defaultValue={this.state.data.Type} required="required"/>
              </div>
           </div>
           <input type="hidden" className={'form-control input-tag'} name="Rated" defaultValue={this.state.data.Rated} />
           <input type="hidden" className={'form-control input-tag'} name="Response" defaultValue={this.state.data.Response} />

     <div className={'form-group row adbt'}>
     <div className={'col-sm-offset-4 col-sm-6'}>
     <button type="button" onClick={this.handleSubmit} className={'btn btn-info pull-right'}>Save</button>
     </div>
     </div>
     </form>

          : this.state.msg!=''?<div><h3 className='text-center'>Movie Added Successfully</h3></div>:<div></div>}
    </div>

     );
}
});



/************************************
      BasicInputBox start
************************************/
var BasicInputBox = React.createClass ({
 render: function (){
   return (
     <div className='searchBar'>
     <input type="text" className='form-control' onChange={this.props.valChange} value= {this.props.val} placeholder="Search Here..."/>
      </div>
   );
 }
});

/***********************************
        DeleteMovieComponent
**************************************/
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

/***************************************
            AddMovie Component
****************************************/


var AddMovie = React.createClass({
   getInitialState: function(){
     return {

     }
   },
   submit: function (e){
     var self
     e.preventDefault()
     self = this
     //console.log("this.state       "+this.state);
     var data = {
       name: this.state.name.trim()
     }

     $.ajax({
       type: 'post',
       url: '/api/movies',
       data: data
     })
     .done(function(data) {
       self.clearForm()
     })
     .fail(function(fail) {
       console.log('failed to register');
     });

   },

   clearForm: function() {
     this.setState({
       name: "",
     });
   },

   nameChange: function(e){
     this.setState({name: e.target.value})
   },

   render: function(){
      return (

        <div className="container col-md-12">
        <div className=" row well" >
        <form onSubmit={this.submit} >
         <div className='searchBar'>
         <BasicInputBox label="Name:" valChange={this.nameChange} val={this.state.name}/>
         <button type="submit" className='form-control btn-info'>Search</button>
         </div>

       </form>
      </div>
      </div>
     );
   }

});

/*****************************************************
                Preparing MovieList
******************************************************/
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

/***************************************
        GetAllMovies Component
****************************************/
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

/************************************************
              ReactDOM
*************************************************/
var browserHistory=ReactRouter.browserHistory;
ReactDOM.render(
  (
    <Router history={browserHistory}>
      <Route path="/" component={MainLayout}>
       <IndexRoute component={Home} />
        <Route path="/home" component={Home} />
        <Route path="/movies" component={GetAllMovies} />
        <Route path="/searchAndSave" component={SearchMovie} />
      </Route>
    </Router>
),document.getElementById('content'))
