const pkg = require('./package');

module.exports = {
  mode: 'universal',

  /*
   ** Headers of the page
   */
  head: {
    title: 'OceanStats | Track ICO Performance',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Track and compare ICO performance over time.'
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#3B8070' },

  /*
   ** Global CSS
   */
  css: ['~/assets/scss/main.scss'],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios'
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: '~/plugins/axios', ssr: true },
    { src: '~/plugins/lodash', ssr: false },
    { src: '~/plugins/vue2-filters', ssr: true },
    { src: '~plugins/ga.js', ssr: false }
  ],
  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    baseURL: 'https://example_restapi',
    credentials: true,
    proxy: false,
    debug: true,
    retry: {
      retries: 1
    },
    requestInterceptor: (config, { store }) => {
      if (store.state.token) {
        config.headers.common['Authorization'] = `JWT ${store.state.token}`
      }
      return config;
    },
    onRequest: config => {
      console.log('Making request to ' + config.url);
    }
    // requestInterceptor: (config, { store }) => {
    //   config.headers.common['Authorization'] = '';
    //   config.headers.common['Content-Type'] = 'application/x-www-form-urlencoded;application/json';
    //   return config;
    // }
  },

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        });
      }
    }
  }
};
