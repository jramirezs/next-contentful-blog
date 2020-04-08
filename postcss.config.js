module.exports = {
  plugins: [
    'postcss-import',
    'tailwindcss',
    'autoprefixer',
    [
      '@fullhuman/postcss-purgecss',
      {
        // Specify the paths to all of the template files in your project
        content: ['./src/**/*.tsx'],

        // make sure css reset isnt removed on html and body
        whitelist: ['html', 'body'],

        whitelistPatterns: [/(^|\.)fa-/, /-fa($|\.)/],

        // Include any special characters you're using in this regular expression
        defaultExtractor: content => content.match(/[A-za-z0-9-_:/]+/g) || [],
      },
    ],
  ],
};
