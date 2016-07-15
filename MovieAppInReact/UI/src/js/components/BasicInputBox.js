var BasicInputBox = React.createClass ({
 render: function (){
   return (
     <div className='searchBar'>
     <input type="text" className='form-control' onChange={this.props.valChange} value= {this.props.val} placeholder="Search Here..."/>
      </div>
   );
 }
});

module.exports=BasicInputBox;
