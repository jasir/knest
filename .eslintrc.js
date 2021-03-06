module.exports = {
  "extends": "eslint:recommended",
  "env": {
    "node": true,
    "es6": true
  },
  "rules": {
    "no-console": "off",
    "semi": ["error", "never"],
  },
  "globals": {
    "after": true,
    "describe": true,
    "it": true,
  }
};
