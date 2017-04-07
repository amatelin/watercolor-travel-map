var React = require('react');
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
var DefaultRoute = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;
var Redirect = Router.Redirect;

var AppView = require('./views/AppView');

var routes = (
    <Route path="/" component={AppView}>
    </Route>
);

module.exports = routes;
