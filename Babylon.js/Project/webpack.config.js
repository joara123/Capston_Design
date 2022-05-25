const path = require('path');
module.exports = {
    mode: 'development',
    entry: {
        app: './src/app.ts'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    devtool: 'source-map',
    plugins: [
      
    ],
    resolve: {
        fallback: {
          'fs': false,
          'path': false, 
      }
    },
    module: {
        rules: [{
            test: /\.tsx?$/,
            loader: 'ts-loader',
            exclude: /node_modules/
        }]
    },
    externals: {
        "earcut": true
    },
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    }
}
