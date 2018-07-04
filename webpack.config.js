const path = require('path');

const config = {
  entry: './public/index.js',
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      { test: /\.js$/, use: 'babel-loader', include: /public/ },
      { test: /\.jsx$/, use: 'babel-loader', include: /public/ },
      {
        test: /\.(scss|css)$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
        include: /public/,
      },
      {
        test: /\.(png|jp(e*)g|svg|gif)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 25000, // Convert images < 8kb to base64 strings
            name: 'images/[name].[ext]',
          },
        }],
        include: /public/,
      },
    ],
  },
};

module.exports = config;
