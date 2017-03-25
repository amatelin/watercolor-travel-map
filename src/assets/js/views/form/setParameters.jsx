var React = require('react/addons');

var ParametersForm = React.createClass({
  title: "Set Parameters",

  getInitialState: function() {
    return {}
  },

  componentWillMount: function() {
    this.props.onLoad(this.title);
  },

  render: function() {
    return (
        <div className='col-md-12'>
          <div className='col-md-6'>
              <button type='button' className='btn btn-primary btn-block' onClick={this.props.onClickPrevious}>
                Previous step
              </button>
          </div>
          <div className='col-md-6'>
            <button type='button' className='btn btn-primary btn-block' onClick={this.props.onClickNext}>
              Next step
            </button>
          </div>
        </div>
    );
  }
});

module.exports = ParametersForm;
