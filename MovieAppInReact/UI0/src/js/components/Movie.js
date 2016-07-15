var React = require('react');
var Modal = require('./Modal');

//Movie Component
var Movie = React.createClass({
    getInitialState(){
          	return {view: {showModal: false},
                    }
        },
        handleHideModal(){
        	this.setState({view: {showModal: false}})
        },
        handleShowModal(){
        	this.setState({view: {showModal: true},
          })
        },
  render : function(){
    return(

      <div className="movie">
        <h2 className="movieName"> </h2>
        <div className="well">
            <div className="row">
                <div className="col-2">
                    <img className="thumbnail" src={this.props.Poster}/>
                </div>
                  <div className="col-10">
                      <h4>{this.props.Title}</h4>
                      <ul className='list-group'>
                          <li className='list-group-item'>Year Released : {this.props.Year}</li>
                          <li className='list-group-item'>IMDB Id : {this.props.imdbID}</li>
                      </ul>
                      <a className="btn btn-primary" href={"http://www.imdb.com/title/"+this.props.imdbID} > View on IMDB</a>
                      <button className="btn btn-success" onClick={this.handleShowModal}>Add</button>
                        	{this.state.view.showModal ? <Modal handleHideModal={this.handleHideModal} movieData={this}/> : null}
                  </div>
            </div>
        </div>
    </div>
    );
  }
});
module.exports = Movie ;
