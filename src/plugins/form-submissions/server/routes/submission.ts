/**
 *  router
 */

import { factories } from '@strapi/strapi';
import traceIp from "../middlewares/traceIp";

export default factories.createCoreRouter('plugin::form-submissions.submission', {
  config: {
    create: {
      auth: false,
      // middlewares: [traceIp]
    },
    find: {
      auth: false
    },
    delete: {
      auth: false
    }
  }
});
