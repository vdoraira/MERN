var BasicInputBox=require('./BasicInputBox');

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

module.exports=AddMovie;
