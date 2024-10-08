const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); 
module.exports = {
  entry: {
   
    background: './src/background.js',  
    content: './src/content.js',  
  },
  output: {
    path: path.resolve(__dirname, 'dist'), 
    filename: '[name].bundle.js',          
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,  
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',  
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],  
          },
        },
      },
      
    
   
      {test: /\.css$/,
      use: [
          'style-loader', 
          'css-loader',   
      ],
    },
      {
        test: /\.html$/,  
        use: 'html-loader',  
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],  
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/popup.html',  
      filename: 'popup.html',  
      inject: 'body',  
    }),
  ],
  mode: 'development',  
};
