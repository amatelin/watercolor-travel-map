var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;
var Redirect = Router.Redirect;

var MainView = require('./views/main');

var routes = (
    <Route path="/">
      <DefaultRoute name="main" handler={MainView}/>
    </Route>
);

module.exports = routes;