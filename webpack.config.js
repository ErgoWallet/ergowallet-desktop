const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const isProduction = process.env.NODE_ENV === 'production';

// {
//   mode: 'development',
//   entry: path.join(__dirname, 'src/main/electron.ts'),
//   target: 'electron-main',
//   module: {
//     rules: [{
//       test: /\.(ts|tsx)$/,
//       exclude: /node_modules/,
//       loader: 'ts-loader',
//     }]
//   },
//   output: {
//     path: __dirname + '/app',
//     filename: 'index.js'
//   },
//   resolve: {
//     extensions: ['.js', '.ts']
//   }
// },
const config = {
  entry: './src/renderer/index.tsx',
  target: 'web',
  devtool: 'source-map',
  devServer: {
    static: {
      directory: path.join(__dirname, 'app'),
    },
    compress: true,
    host: 'localhost',
    port: 9000,
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        include: /src/,
        use: [{ loader: 'ts-loader' }]
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
        include: [/typeface-roboto/, /typeface-roboto-mono/, path.resolve(__dirname, 'src')],
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/'
            }
          }
        ]
      }
    ]
  },
  output: {
    path: __dirname + '/app',
    filename: 'renderer.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/renderer/index.html'
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: path.join(__dirname, 'resources/icons/16x16.png'), to: './icons/' }
      ],
      options: {
        // copyUnmodified: true
      }
    }),
  ],
  resolve: {
    extensions: ['.js', '.tsx', '.ts']
  }
}


module.exports = () => {
  if (isProduction) {
    config.mode = 'production';
  } else {
    config.mode = 'development';
  }
  return config;
};
