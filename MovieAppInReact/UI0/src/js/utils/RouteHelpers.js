var React = require('react');
var Router = require('react-router');



var AuthStore = require('../stores/AuthStore');

var LoginRequired = React.createClass({
  statics: {
    willTransitionTo: function (transition, params, query, callback) {
      if(!AuthStore.loggedIn()){
        // go over to login page
        transition.redirect('/login', null, { redirect: transition.path });
      }
      callback();
    }
  },
  render () {
    return (
      <Router.RouteHandler/>
    );
  }
});

module.exports =  LoginRequired ;