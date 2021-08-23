const path = require('path');

module.exports = {
    mode: 'production',
    entry: './dist/src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'browser'),
        libraryTarget: 'var',
        library: 'cop',
    },
    resolve: {
        fallback: {
            url: false,
            fs: false,
            net: false,
            tls: false,
            assert: false,
            path: require.resolve('path-browserify'),
        },
    },
    module: {
        // Used to exclude certain methods (such as I/O) from the browser-version
        rules: [
            {
                test: /\.js$/,
                enforce: 'pre',
                exclude: /(node_modules|bower_components|\.spec\.js)/,
                use: [
                    {
                        loader: 'webpack-strip-block',
                        options: {
                            start: 'cop-node-only-start',
                            end: 'cop-node-only-end',
                        },
                    },
                ],
            },
        ],
    },
};
