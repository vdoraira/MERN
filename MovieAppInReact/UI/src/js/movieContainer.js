var routes = require('./routes.js');
var { Router, Route, IndexRoute, Link, browserHistory }=ReactRouter



/************************************************
              ReactDOM
*************************************************/
var browserHistory=ReactRouter.browserHistory;
Router.run(routes, Router.HistoryLocation, function(Root){
ReactDOM.render( <Root/>,document.getElementById('content'));
});



/*
<Router history={browserHistory}>
  <Route path="/" component={MainLayout}>
   <IndexRoute component={Home} />
    <Route path="/home" component={Home} />
    <Route path="/movies" component={GetAllMovies} />
    <Route path="/searchAndSave" component={SearchMovie} />
  </Route>
</Router>
*/
