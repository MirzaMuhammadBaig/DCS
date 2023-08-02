module.exports = {
  // Your existing webpack configuration options...
  resolve: {
    fallback: {
      "assert": false,
      "stream-browserify": false,
      "stream": false
    }
  },
};
