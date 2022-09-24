module.exports = [
  'strapi::errors',
  'strapi::security',
  'strapi::poweredBy',
  {
    // クロスサイトオリジン設定
    name: 'strapi::cors',
    config: {
      enabled: true,
      headers: '*',
      origin: ['http://localhost:1337', 'http://localhost:3000']
    }
  },
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
