export default [
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:', 'http:' ],
          'script-src': ["'self'", "'unsafe-inline'", 'cdn.jsdelivr.net'],
          'img-src': ["'self'", 'data:', 'blob:', 'strapi.io', 'res.cloudinary.com', 'https://market-assets.strapi.io/', ],
          'style-src': ["'self'", '*', 'data:', 'blob:', "'unsafe-inline'", 'strapi.io', 'http://cdn.jsdelivr.net', ],
          'media-src': ["'self'", 'data:', 'blob:', 'cdn.jsdelivr.net', 'http://cdn.jsdelivr.net', 'strapi.io', 'res.cloudinary.com'],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  'strapi::security',

  'strapi::cors',
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
