var React = require('react/addons');
var SetRoutesForm = require('./form/setRoutes');
var SetParametersForm = require('./form/setParameters');
var DownloadForm = require('./form/download');


var MainView = React.createClass({

  contextTypes: {
    router: React.PropTypes.func
  },

  getInitialState: function() {
    return ({
      formStepIndex: 0,
      loaded: 0,
      formComponentTitle: "Jack Nicholson"
    })
  },

  onClickNext: function(title) {
    this.setState({
      formStepIndex: this.state.formStepIndex + 1
    });
  },

  onClickPrevious: function(title) {
    this.setState({
      formStepIndex: this.state.formStepIndex - 1
    });
  },

  onFormComponentLoad: function(title) {
    this.setState({
      formComponentTitle: title
    });
  },

  renderFormComponent: function() {
    console.log("call")
    console.log(this.state.formStepIndex)
    switch(this.state.formStepIndex) {
      case 0:
        console.log("first form");
        return (
          <SetRoutesForm onLoad={this.onFormComponentLoad} onClickNext={this.onClickNext}/>
        );
      case 1:
        return (
          <SetParametersForm onLoad={this.onFormComponentLoad} onClickNext={this.onClickNext}
            onClickPrevious={this.onClickPrevious}/>
        );
      case 2:
        return (
          <DownloadForm onLoad={this.onFormComponentLoad} onClickPrevious={this.onClickPrevious}/>
        );
    }
  },

  componentDidMount: function() {
    this.setState({loading: true});
  },

  render: function () {
    return (
      <div className='row'>
        <div className='col-md-4'>
          <div className='col-md-12'>
            <h2>{this.state.formComponentTitle}</h2>
          </div>
          <div className='col-md-12'>
            {this.renderFormComponent()}
          </div>
        </div>

        <div className='col-md-8'>
          <div id='googleMap' className='iframe-container'>
          </div>
        </div>

      </div>
    );
  },
});

module.exports = MainView;
