const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    index: './demo/index.ts',
    gravity: './demo/gravity.ts',
    shoot: './demo/shoot.ts',
    bounce: './demo/bounce.ts',
    //sinwave: './demo/sinwave.ts',
    circularmotion: './demo/circularmotion.ts',
    keyboard: './demo/keyboard.ts'
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
    path: path.resolve(__dirname, 'demo', 'build'),
  },
};
