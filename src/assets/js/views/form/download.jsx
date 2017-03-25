var React = require('react/addons');

var DownloadForm = React.createClass({
  title: "Download Map",

  getInitialState: function() {
    return {}
  },

  componentWillMount: function() {
    this.props.onLoad(this.title);
  },

  render: function() {
    return (
      <div className='col-md-12'>
        <div className='col-md-6 col-md-offset-3'>
          <button type='button' className='btn btn-primary btn-block' onClick={this.props.onClickPrevious}>
            Previous step
          </button>
        </div>
      </div>
    );
  }
});

module.exports = DownloadForm;
