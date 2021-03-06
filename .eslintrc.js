module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    '@react-native-community',
    'plugin:prettier/recommended',
  ],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
    'react-hooks/exhaustive-deps': 'warn', // <--- THIS IS THE NEW RULE
  },
};
