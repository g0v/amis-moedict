var path = require('path');
var webpack = require('webpack');
var entries = [];
var loaders = [];
var plugins = [];
if (/production/.test(process.env.NODE_ENV)) {
    plugins = [ new webpack.optimize.UglifyJsPlugin() ];
}
else {
    entries = [ 'webpack-dev-server/client?http://localhost:8888', 'webpack/hot/dev-server' ];
    loaders = [ { loader: 'react-hot', exclude: /node_modules/ } ]
    plugins = [ new webpack.HotModuleReplacementPlugin() ];
}

module.exports = {
    entry: entries.concat([
        './main.js',
        './js/jquery-ui-1.12.1.custom.min.js',
        './js/jquery.hoverIntent.js',
        './js/bootstrap/dropdown.js',
        './js/phantomjs-shims.js',
        './js/console-polyfill.js',
    ]),
    output: {
        path: __dirname + '/js/',
        filename: 'deps.js',
        publicPath: '/js/'
    },
    plugins: plugins,
    module: {
        loaders: loaders.concat([
            { test: /\.jsx?$/, loader: 'babel?stage=0', exclude: /node_modules/ },
            { test: /\.json$/, loader: 'json' }
        ])
    },
    devServer: {
      disableHostCheck: true
    },
}
