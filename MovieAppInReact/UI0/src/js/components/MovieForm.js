var React = require('react');
var Navbar = require('./Navbar');


//MovieForm
var MovieForm = React.createClass({
    getInitialState: function() {
        return {Title: ''};
    },
    handleTitleChange: function(e) {
        this.setState({Title: e.target.value});
    },
    handleSubmit: function(e) {
        e.preventDefault();
        var Title = this.state.Title.trim();
        if (!Title) {
            return;
        }
        this.props.onMovieSubmit({Title: Title});
        this.setState({Title: ''});
    },

    render : function(){
        return(
            <div className="search-form" >
                <h1 className="text-center">Search For a Movie </h1>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <input  name="Title"  type="text"
                                className="form-control"
                                ref="title"
                                placeholder="Enter a Movie Title..."
                                value={this.state.Title}
                                onChange={this.handleTitleChange} />
                    </div>
                    <input className="btn btn-primary btn-block" type="submit" value="Search and Save" />

                </form>
            </div>

        );
    }
});

module.exports = MovieForm ;
