/**
 *  router
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreRouter("plugin::sms-service.message", {
  config: {
  }
});
