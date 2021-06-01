const path = require("path");

module.exports = {
    mode: "development",
    entry: path.resolve(__dirname, `src`, `app`, ),
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    resolve: {
        extensions: [".jsx", '.jsx']
    },
    devServer: {
        historyApiFallBack: true
    },
    module: {
        rules: [{
            test: /\.jsx?/,
            loader: 'babel-loader'
        }]
    }
}