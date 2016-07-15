//var ReactDOM=require('react-dom');
//var React=require('react'),

/*** @jsx React.DOM */
var NativeInput = React.createClass({
  getInitialState: function() {
    return {
      value: ""
    };
  },

  render: function() {
    return (
      <input type="text" value={this.state.value} onChange={this.handleChange} />
    );
  },

  handleChange: function(e) {
    this.setState({
      value: e.target.value
    });

    if (this.props.hasOwnProperty('onChange')) {
      this.props.onChange(e.target.value);
    }
  }
});

var SearchInput = React.createClass({
  render: function() {
    return (
      <div className="search-input">
        <NativeInput onChange={this.handleChange} />
        <button onClick={this.handleResult}>Search</button>
      </div>
    );
  },
  getInitialState: function() {
    return {
      mString: null
    }
  },
  handleChange: function(mString) {
    this.setState({
      mString: mString
    });
  },
  handleResult: function() {
    this.props.onClick(this.state.mString);
  }
});

var SearchResultList = React.createClass({
  render: function() {
    return (
      <div className="search-output">
        {this.props.results.map(function(result) {
          var imgURL=(result.Poster!="N/A"?result.Poster:"http://lorempixel.com/300/300");
          return (
            <div key={result.imdbID} className="result">
              <img src={imgURL} alt={result.Title}/>
              <div className="content">
                <h4>{result.Title}</h4>
                <p>{result.Year}</p>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
});


/*** @jsx React.DOM */
var App = React.createClass({
  getInitialState: function() {
    return {
      result: []
    };
  },
  render: function() {
    return (
      <div>
        <SearchInput onClick={this.handleResult} />
        <SearchResultList results={this.state.result} />
      </div>
    );
  },
  /** Expected to be used only by the searchInput-component */
  handleResult: function(mString) {

    var updateResult = function(response, textStatus, jqXHR) {
      this.setState({
        result: (response.Search instanceof Array) ? response.Search : [response.Search]
      });
      //console.log(JSON.stringify(response.Search));
    }.bind(this);

    $.ajax('http://www.omdbapi.com', {
      method: 'GET',
      data: { 's': mString, 'type': 'movie' },
      cache:false,
      success: updateResult,
      error: updateResult
    });
  }
});
ReactDOM.render(<App />, document.getElementById('main-container'));
