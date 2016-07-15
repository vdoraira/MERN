var React = require('react');
var Navbar = require('./Navbar');

var MainLayout = React.createClass({
    render: function()
    {
        return(
            <Navbar />
        )
    }

});

module.exports = MainLayout;
