var Reflux = require('reflux');
var Actions = require('../actions/AuthActions');

var renderTimeout = 250; // set a timeout to simulate async response time

var AuthStore = Reflux.createStore({
  listenables: [Actions],

  init: function () {
    // pull cached token if one exists
    this.jwt = localStorage.getItem('jwt');

    this.claims = this.parseJwt();
    this.error = false;
    this.loading = false;
  },

  getState : function () {
    return {
      loading: this.loading,
      error: this.error,
      user: this.userFromClaims(),
      loggedIn: this.loggedIn()
    };
  },

  userFromClaims: function () {
    // will want to do some cleanup of the claims
    // because they're designed to be very small field names for xfer size
    return this.claims;
  },

  loggedIn : function () {
    // helper
    return this.claims !== null;
  },

  changed : function () {
    this.trigger(this.getState());
  },

  onLogin : function (email, password) {
    this.loading = true;
    this.changed();

    // fake API simulation
    setTimeout(function() {
      Actions.login.completed(
      $.ajax({
      url: 'http://localhost:8080/user/authenticate/' + email +'/' +password,
      dataType: 'json',
      type: 'GET',
      //data: movie,
      success: function(data) {
      //console.log(data.success);
      if(data.success){
      this.jwt = data.token;
      //this.claims = this.parseJwt();
      this.error = false;

      localStorage.setItem('jwt', this.jwt);
    } else{
        this.error = 'Username or password invalid.';
    }
      },
      error: function(xhr, status, err) {
      console.error('http://localhost:8080/user/authenticate', status, err.toString());
        this.error = 'Username or password invalid.';
      }
      })
      );
    }, renderTimeout);
  },

  onLoginCompleted : function(authResponse) {
    if(authResponse){
      this.jwt = authResponse.jwt;
      this.claims = this.parseJwt();
      this.error = false;
  //transition.redirect('/', null, { redirect: transition.path });
    //  localStorage.setItem('jwt', this.jwt);
    } else {
      this.error = 'Username or password invalid.';
    }

    this.loading = false;
    this.changed();
  },

  onLogout : function () {
    // clear it all
    this.jwt = null;
    this.claims = null;
    this.error = false;
    this.loading = false;
    localStorage.removeItem('jwt');
  },

  parseJwt : function () {
    if(this.jwt === null){ return null; }
    return this.jwt;
  }

});

module.exports = AuthStore;
