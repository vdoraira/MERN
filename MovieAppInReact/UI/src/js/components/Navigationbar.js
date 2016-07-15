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

module.exports=NavigationBar;
