const path = require('path');

module.exports = {
    entry: "./webpack/entry.js",
    output: {
        path: path.resolve(__dirname, 'assets/js'),
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
        ]
    }
};