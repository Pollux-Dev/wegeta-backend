module.exports = ({ env }) => ({
  // ...
  upload: {
    config: {

    /*  provider: 'local',
      providerOptions: {
        // sizeLimit: 100000,
      },*/

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
      },
    },
  },

  "form-submissions": {
    enabled: true,
    resolve: "./src/plugins/form-submissions",
  },

  // ...
});
