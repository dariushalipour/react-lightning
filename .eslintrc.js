module.exports = {
  "parser": "babel-eslint",
  "extends": "airbnb",
  "rules": {
    "semi": [2, "never"],
    "react/jsx-one-expression-per-line": 0,
    "no-continue": 0,
    "no-restricted-syntax": 0,
    "import/prefer-default-export": 1,
    "arrow-parens": [2, "as-needed"],
    "no-underscore-dangle": 0,
    "babel/semi": [2, "never"],
  },
  "plugins": [
    "babel",
  ],
};