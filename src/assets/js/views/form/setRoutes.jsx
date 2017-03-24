var React = require('react/addons');

var RoutesForm = React.createClass({
  title: "Set Routes",

  getInitialState: function() {
    return {}
  },

  componentWillMount: function() {
    this.props.onLoad(this.title);
    console.log("mounted")
  },

  render: function() {
    return(
      <div></div>
    );
  }
});

module.exports = RoutesForm;
