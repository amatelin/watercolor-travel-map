var React = require('react');
var ReactDOM = require('react-dom');
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
var routes = require('./routes');
var AppView = require('./views/AppView');
var ReactDom = require('react-dom');

ReactDOM.render(
  <Router>
  {routes}
  </Router>,
  document.getElementById('app')
)
