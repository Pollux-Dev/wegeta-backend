module.exports = ({ env }) => ({
  // ...
  upload: {
    config: {
      provider: "cloudinary",
      providerOptions: {
        cloud_name: env("CLOUDINARY_NAME"),
        api_key: env("CLOUDINARY_KEY"),
        api_secret: env("CLOUDINARY_SECRET"),
      },
      actionOptions: {
        upload: {},
        delete: {},
      },
    },
  },
  ezforms: {
    enabed: true,
    config: {
      captchaProvider: {
        name: "none",
      },
      notificationProviders: [],
      enableFormName: true,
    },
  },

  todo: {
    enabled: true,
    resolve: "./src/plugins/todo",
  },

  "generated-page-link": {
    enabled: true,
    resolve: "./src/plugins/generated-page-link",
  },

  "sms-service": {
    enabled: true,
    resolve: "./src/plugins/sms-service",
  },

  documentation: {
    enabled: false,
    config: {
      "x-strapi-config": {
        plugins: ["todo", "users-permissions"], // Custom
      }
    },
  },

  // ...
});
