const path = require('path');

module.exports = {
  plugins: [
    'import'
  ],
  settings: {
    'import/resolver': {
      typescript: {
        config: path.join(__dirname, './webpack.config.js'),
        alwaysTryTypes: true
      },
    },
  },
  // ...
};