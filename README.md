# Watercolor travel map
Web application using Google Maps and [stamen](http://stamen.com) watercolor tiles to generate a travel map. The map can then be downloaded by the user as a png file. 


## Technologies
* [Facebook's React](https://facebook.github.io/react/) for the UI
* [react-bootstrap](http://react-bootstrap.github.io/) and custom CSS3 for layout, styling and responsiveness
* [flux](https://facebook.github.io/flux/) for the application architecture
* [Bourbon](http://bourbon.io/) for useful CSS mixins
* [npm](https://www.npmjs.com/) to manage dependencies
* JavaScript is written using the subset of ECMAScript 6 made available thru the [babel compiler](https://babeljs.io/)
* [Grunt](http://gruntjs.com/) to automate tasks
* [React Hot Loader](http://gaearon.github.io/react-hot-loader/) for reloading only parts of the app that have changed during development
* [React Router](http://rackt.github.io/react-router/) for front-end routing
* [Webpack](http://webpack.github.io/) to bundle the application for production
* [Google maps JS](https://developers.google.com/maps/documentation/javascript/) for the map
* [canvg](https://github.com/canvg/canvg) to convert the SVG elements into canvas to that they can be rendered by html2canvas
* [html2canvas](https://github.com/niklasvh/html2canvas) to convert the map DOM element into an image
* [FileSaver](https://github.com/eligrey/FileSaver.js/) to save the resulting image
* [rc-color-picker](http://react-component.github.io/color-picker/) for the UI elements allowing to select the colors

## Building
```
grunt build
```

## Credits
Map tiles by [Stamen Design](http://stamen.com).

Icons used as markers designed by [Freepik](http://www.freepik.com).
