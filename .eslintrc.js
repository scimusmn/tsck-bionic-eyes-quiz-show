const path = require('path');

module.exports = {
  extends: ['airbnb', 'plugin:jsx-a11y/strict', 'prettier'],
  env: {
    browser: true,
  },
  ignorePatterns: ['public/*', 'src/Arduino/arduino-base', 'src/html.js'],
  rules: {
    'import/no-extraneous-dependencies': 'off',
    // The SMM team doesn't write React code in .jsx files exclusively, as is suggested in the
    // Airbnb guide, so override this rule to allow .js files.
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', '.jsx'],
      },
    ],
    'jsx-a11y/media-has-caption': 'off',
    'consistent-return': 'off',
    'react/jsx-no-bind': 'off',
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@components', path.resolve(__dirname, './src/components')],
          ['@styles', path.resolve(__dirname, './src/styles')],
        ],
        extensions: ['.ts', '.js', '.jsx', '.json'],
      },
    },
  },
};
