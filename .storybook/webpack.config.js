const path = require('path');

module.exports = ({ config }) => {
  config.resolve.alias['@'] = path.resolve(__dirname, '../')
  config.module.rules.push({
    test: /\.scss$/,
    use: [
      {
        loader: 'style-loader'
      },
      {
        loader: 'css-loader'
      },
      {
        loader: 'sass-loader',
      },
    ],
  });

  return config
}
