var React = require('react/addons');

var ParametersForm = React.createClass({
  title: "setParameters",

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

module.exports = ParametersForm;
