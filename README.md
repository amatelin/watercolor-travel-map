# react-boilerplate

This is my take on a React boilerplate.

## Technologies
* [Facebook's React](https://facebook.github.io/react/) for the UI
* [Zurb's Foundation](http://foundation.zurb.com/) and custom CSS3 for layout, styling and responsiveness
* [Bourbon](http://bourbon.io/) for useful CSS mixins
* [npm](https://www.npmjs.com/) to manage dependencies
* JavaScript is written using the subset of ECMAScript 6 made available thru the [babel compiler](https://babeljs.io/)
* [Grunt](http://gruntjs.com/) to automate tasks
* [React Hot Loader](http://gaearon.github.io/react-hot-loader/) for reloading only parts of the app that have changed during development
* [React Router](http://rackt.github.io/react-router/) for front-end routing
* [Webpack](http://webpack.github.io/) to bundle the application for production

## Developing
A Grunt task called `dev` has been setup for development. It automates quite a few things:

* Watches the `src/scss` directory for changes and recompiles everything to `src/css`.
* Runs Webpack in watch mode as well as react-hot-loader. Runs a local server on port 3000 for development

When you first clone the project, you'll need to run `npm install` to fetch the dependencies. It will in turn run
`bower install` to fetch additional dependencies not available thru npm. The `node_modules` and `bower_components`
directories are already added to `.gitignore`.

The module at `src/assets/js/app.js` bootstraps the application. It loads the application's routes from its sibling,
`routes.js`. This is where you should start looking to add new functionality to your application.

When your routes are setup, you can start adding new components (views/layouts) in the `views` directory.

Once your application gets large enough -- a good indicator is your components starting to have too much logic -- you
should start looking at [Facebook's Flux architecture](https://facebook.github.io/flux/). In this document, Facebook's
dev team talks about a suggested architecture for building predictable and easily maintainable applications. While the
approach is code-agnostic, it lends itself well to React's way of doing things. Moreover, the open-source community
has already started creating frameworks that aim to implement the Flux architecture. The author of this boilerplate
uses [Fluxxor](http://fluxxor.com/), but [many](http://deloreanjs.com/), [many](https://github.com/spoike/refluxjs)
[alternatives](https://github.com/yahoo/dispatchr) [exist](http://martyjs.org/) (:

## Building
A Grunt task called `build` has been setup to build the app for production. The task compiles your SASS to a compressed
CSS file, and your modularized JavScript to a compressed and optimized `app-bundle.js`. It copies the compiled files
and all your other assets from the `src` directory into the `dist` directory. This directory is conveniently ignored
by the provided `.gitignore`.