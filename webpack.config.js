const path = require('path');

const config = {
  entry: './public/index.js',
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      { test: /\.js$/, use: 'babel-loader' },
      { test: /\.jsx$/, use: 'babel-loader' },
      {
        test: /\.(scss|css)$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
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
