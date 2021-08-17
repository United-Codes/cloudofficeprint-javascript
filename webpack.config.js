const path = require('path');

module.exports = {
    mode: 'production',
    entry: './dist/src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
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
};
