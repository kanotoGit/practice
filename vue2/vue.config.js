module.exports = {
  devServer: {
    proxy: {
      '/': {
        target: "http://querynote.net",
        changeOrigin: true,
      }
    }
  }
};