var webpack = require('webpack');

module.exports = {
    entry: './src/assets/js/app.js',
    output: {
        path: './src/assets/js',
        filename: 'app-bundle.js',
        publicPath: '/assets/js/'
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
        modulesDirectories: ['web_modules','node_modules','bower_components']
    },
    module: {
        preLoaders: [
            {
                test: /src\/.*\.jsx?$/,
                loaders: ['babel-loader']
            }
        ],
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'jsx-loader?insertPragma=React.DOM'
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            React: 'react/addons'
        })
    ]
};