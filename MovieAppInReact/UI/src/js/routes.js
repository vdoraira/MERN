var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;

var Master = require('./components/Master');
/*var Home = require('./pages/Home/Home');
var Login = require('./pages/Login/Login');
var MovieBox = require('./components/MovieBox');
var HomePage = require('./components/Home');
var ViewMovieBox = require('./components/ViewMovieBox');

var  LoginRequired  = require('./utils/RouteHelpers');
*/
var NavigationBar=require('./components/NavigationBar');
var AddMovie=require('./components/AddMovie');
var BasicInputBox=require('./components/BasicInputBox');
var DeleteMovie=require('./components/DeleteMovie');
var GetAllMovies=require('./components/GetAllMovies');
var Home=require('./components/Home');
var MainLayout=require('./components/MainLayout');
var MovieList=require('./components/MovieList');
var SearchAndSave=require('./components/SearchAndSave');
var SearchMovie=require('./components/SearchMovie');
module.exports = (
<Route>
    <Route handler={Login} name="Login" path="/Login"/>
    <Route handler={LoginRequired}>
        <Route handler={Master}>
            <DefaultRoute handler={Home} name="Home"/>
        </Route>
        <Route handler={Home} name="HomePage" path="/home"/>

    </Route>
</Route>
);
