var BasicInputBox=require('./BasicInputBox');
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

module.exports=SearchMovie
