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
      <div></div>
    );
  }
});

module.exports = DownloadForm;
