var _ = require('lodash');
var webpack = require('webpack');
var webpackOptions = require('./webpack.config');
var webpackDevOptions = _.extend({}, webpackOptions, {
    entry: [
        'webpack-dev-server/client?http://localhost:3000',
        'webpack/hot/only-dev-server',
        './src/assets/js/app'
    ],
    plugins: webpackOptions.plugins.concat(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ),
    module: {
        preLoaders: [
            {
                test: /src\/.*\.jsx?$/,
                loaders: ['babel-loader']
            },
        ],
        loaders: [
            {
                test: /src\/.*\.jsx?$/,
                loaders: ['react-hot', 'jsx-loader?insertPragma=React.DOM']
            },
            {
                test : /(node_modules|bower_components)\/.*\.jsx?$/,
                loaders: ['jsx-loader?insertPragma=React.DOM']
            }
        ]
    },
    devtool: 'source-map',
    debug: true
});

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concurrent: {
            dev: {
                options: {
                    logConcurrentOutput: true
                },
                tasks: ['copy:dev', 'watch:sass', 'webpack-dev-server:start']
            }
        },
        webpack: {
            options: webpackOptions,
            dist: {
                plugins: webpackOptions.plugins.concat(
                    new webpack.DefinePlugin({
                        "process.env": {
                            // This has effect on the react lib size
                            "NODE_ENV": JSON.stringify("production")
                        }
                    }),
                    new webpack.optimize.DedupePlugin(),
                    new webpack.optimize.UglifyJsPlugin()
                ),
                output: {
                    path: './dist/assets/js',
                    filename: 'app-bundle.js'
                }
            }
        },
        'webpack-dev-server': {
            options: {
                webpack: webpackDevOptions,
                contentBase: 'src/',
                publicPath: '/assets/js/',
                hot: true
            },
            start: {
                port: 3000,
                keepAlive: true
            }
        },
        watch: {
            sass: {
                files: 'src/assets/scss/**/*.scss',
                tasks: ['sass:dev'],
                options: {atBegin: true}
            }
        },
        sass: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'src/assets/scss',
                    src: ['*.scss'],
                    dest: 'dist/assets/css',
                    ext: '.css'
                }],
                options: {
                    style: 'compressed'
                }
            },
            dev: {
                files: [{
                    expand: true,
                    cwd: 'src/assets/scss',
                    src: ['*.scss'],
                    dest: 'src/assets/css',
                    ext: '.css'

                }],
                options: {
                    style: 'nested',
                    quiet: true,
                    lineNumbers: true
                }
            }
        },
        copy: {
            dev: {
              files: [
                {
                   expand: true,
                   filter: 'isFile',
                   flatten: true,
                   cwd: 'src/assets/scss/bootstrap',
                   src: ['assets/fonts/**'],
                   dest: 'src/assets/fonts/bootstrap'

                 },
                 {
                    expand: true,
                    filter: 'isFile',
                    flatten: true,
                    cwd: 'src/assets/',
                    src: ['*/images'],
                    dest: 'src/assets/images'
                  }

              ]
            },
            dist: {
              files: [
                {
                  expand: true,
                  cwd: 'src/',
                  src: [
                    '**',
                    '!assets/.sass-cache/',
                    '!assets/css/app.css',
                    '!assets/scss/**',
                    '!assets/js/**',
                    // '!assets/fonts/**',
                    // '!assets/images/**'
                  ],
                  dest: 'dist/'
                },
                {
                  expand: true,
                  cwd: 'src/assets/scss/',
                  src: ['rc-color-picker/assets/index.css'],
                  dest: 'dist/assets/css/'
                }
              ]
            }
        },
        clean: {
            dist: ['dist']
        },
        'gh-pages': {
          options: {
            base: 'dist'
          },
          src: ['**']
        },
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-webpack');
    grunt.loadNpmTasks('grunt-gh-pages')

    grunt.registerTask('dev', ['concurrent:dev']);
    grunt.registerTask('build', ['clean:dist', 'copy:dist', 'webpack:dist', 'sass:dist']);
    grunt.registerTask('publish', ['gh-pages'])
};
