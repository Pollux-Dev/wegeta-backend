import { Strapi } from "@strapi/strapi";

export default ({ strapi }: { strapi: Strapi }) => {
  strapi.customFields.register({
    name: "page-link",
    plugin: "generated-page-link",
    type: "string",
  });
};
