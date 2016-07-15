var React = require('react');
var ReactDOM = require('react-router');
var AddForm = require('./AddForm');

var Modal = React.createClass({
        componentDidMount(){
            $(this.getDOMNode()).modal('show');
            $(this.getDOMNode()).on('hidden.bs.modal', this.props.handleHideModal);
          },
        render : function(){
        	return (
              <div className="modal fade">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                      <h4 className="modal-title">Add Movie Details</h4>
                    </div>
                    <div className="modal-body">
                    <AddForm handleCloseModal={this.props.handleHideModal} movieData={this.props.movieData}/>
                    </div>
                    <div className="modal-footer">
                    </div>
                  </div>
                </div>
              </div>
            )
        },
        propTypes:{
        	handleHideModal: React.PropTypes.func.isRequired
        }
    });

    module.exports = Modal;
