require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    author: '@scimusmn',
    description: 'Science Museum of Minnesota exhibit template',
    title: 'app-template',
  },
  plugins: [
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-eslint',
    {
      resolve: 'gatsby-plugin-sass',
      options: {
        data: '@import "src/styles/_variables"; @import "src/styles/_shared";',
        includePaths: ['src/components'],
      },
    },
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'assets',
        path: `${__dirname}/src/assets`,
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        icon: 'src/assets/smm.png',
        name: 'app-default',
        short_name: 'app',
        start_url: '/',
        background_color: '#ffffff',
        theme_color: '#000000',
        display: 'minimal-ui',
      },
    },

    {
      resolve: 'gatsby-plugin-google-fonts',
      options: {
        fonts: [`montserrat:400`, `open sans:400`, `tajawal:400`],
        display: 'swap',
      },
    },
  ],
};
