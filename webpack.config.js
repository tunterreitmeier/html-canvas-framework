const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    index: './ts/index.ts',
    gravity: './ts/gravity.ts',
    shoot: './ts/shoot.ts',
    bounce: './ts/bounce.ts'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build'),
  },
};
