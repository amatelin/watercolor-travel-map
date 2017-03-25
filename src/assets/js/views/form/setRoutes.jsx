var React = require('react/addons');

var LandInput = React.createClass({
  getInitialState: function() {
    return {
      type: "",
      departureAddress: "",
      arrivalAddress: ""
    }
  },

  componentWillMount: function() {
    this.setState({
      type: this.props.inputType
    });
  },

  render: function() {
    return (
      <div>
        <div className='col-md-6'>
          <input type='text' className='form-control' placeholder='departure address'>
          </input>
        </div>
        <div className='col-md-6'>
          <input type='text' className='form-control' placeholder='arrival address'>
          </input>
        </div>
      </div>
    )
  }
});

var WayPointInput = React.createClass({
  getInitialState: function() {
    return {
      address: ""
    }
  },

  render: function() {
    return (
      <div>
      </div>
    )
  }
});

var OverLandInput = React.createClass({
  getInitialState: function() {
    return {
      type: "",
      coordinates: {latitude: null, longitude: null}
    }
  },

  componentWillMount: function() {
    this.setState({
      type: this.props.inputType
    });
  },

  render: function() {
    return (
      <div></div>
    )
  }
});

var PointInput = React.createClass({
  getInitialState: function() {
    return {
      type: "",
      address: "",
      title: null
    }
  },

  componentWillMount: function() {
    this.setState({
      type: this.props.inputType
    });
  },

  render: function() {
    return (
        <div></div>
    )
  }
})


var RoutesForm = React.createClass({
  title: "Set Routes",

  getInitialState: function() {
    return {
      inputList: {
        routeInput: []
      }
    }
  },

  componentWillMount: function() {
    this.props.onLoad(this.title);
    console.log('mounted')
  },

  addRouteInput: function() {
    var inputList = this.state.inputList;
    inputList.routeInput = inputList.routeInput.concat(<LandInput inputType='route' />);
    this.setState({ inputList: inputList });
  },

  render: function() {
    return(
      <div>
        <div className='col-md-12'>
          <form>
            <div className='col-md-12'>
              <button className='btn btn-default' onClick={this.addRouteInput}>
                <span className='glyphicon glyphicon-plus'></span>
                &nbsp; Add new cycling route
              </button>
              <div>
                {this.state.inputList.routeInput}
              </div>
            </div>
          </form>
        </div>

        <div className='col-md-12'>
          <div className='col-md-6 col-md-offset-3'>
            <button type='button' className='btn btn-primary btn-block' onClick={this.props.onClickNext}>
              Next step
            </button>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = RoutesForm;
