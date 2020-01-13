var webpack = require('webpack');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'public');
var APP_DIR = path.resolve(__dirname, 'src');

var config = {
    mode: 'development',
    entry: APP_DIR + '/index.jsx',
    output: {
        path: BUILD_DIR,
        filename: 'bundle.js'
    },
    module : {
        rules : [
            {
                test : /\.jsx?/,
                include : APP_DIR,
		use : {
                    loader : 'babel-loader',
		    options: {
                        presets: ['@babel/preset-env']
                    }
	        }
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            // This stops the asset URLs from being modified. We want them to remain as
                            // relative urls e.g. static/svgs.. will resolve in Juju to /gui/static/svgs/...
                            url: false
                        },
		    }
		]
	    }
        ]
    },
    node: {
        // Let Webpack handle the fs for the web as we're not building for node.
        // See: https://webpack.js.org/configuration/node/#other-node-core-libraries
        fs: 'empty'
    },
    plugins: [
        // Output the CSS to the build dir.
        new MiniCssExtractPlugin({
            // This file is relative to output.path above.
            filename: 'bundle.css',
            chunkFilename: '[id].css'
        })
    ],
    resolve: {
        modules: [
            'node_modules'
        ]
    },
    stats: {
        // This hides the output from MiniCssExtractPlugin as it's incredibly verbose.
        children: false
    }
};
module.exports = config;
