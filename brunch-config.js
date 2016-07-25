exports.config = {
  // See http://brunch.io/#documentation for docs.
  files: {
    stylesheets: {
      joinTo: 'style.css'
    }
  },

  // Phoenix paths configuration
  paths: {
    // Dependencies and current project directories to watch
    watched: [ 'css' ],
    // Where to compile files to
    public: 'assets'
  },

  // Configure your plugins
  plugins: {
    sass: {
      options: {
        includePaths: [
          'node_modules'
        ]
      }
    },

    postcss: {
      processors: [
        require('autoprefixer')()
      ]
    }
  }
}
