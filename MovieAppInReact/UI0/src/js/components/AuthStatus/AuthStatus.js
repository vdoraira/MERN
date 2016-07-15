var React = require('react');
var Router = require('react-router');
var Link = require('react-router').Link;
var Reflux = require('reflux');

var AuthStore = require('../../stores/AuthStore');
var AuthActions = require('../../actions/AuthActions');

var AuthStatus = React.createClass({
  mixins: [
    Router.Navigation,
    Reflux.connect(AuthStore),
    Reflux.ListenerMixin
  ],

  componentWillMount () {
    // TODO: is there a smarter way to do this?
    this.setState(AuthStore.getState());
  },

  componentDidMount () {
    this.listenTo(AuthStore, this.onAuthChange);
  },

  onAuthChange(auth) {
    this.setState(auth);
  },

  handleLogout() {
    AuthActions.logout();
    this.transitionTo('/login');
  },

  render() {
    if(this.state.user){
      return (

        
          <li><Link to="/"  onClick={this.handleLogout }>Log Out</Link></li>
            );
    }
  }
});


module.exports = AuthStatus;
