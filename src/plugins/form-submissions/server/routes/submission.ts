/**
 *  router
 */

import { factories } from '@strapi/strapi';
import traceIp from "../middlewares/traceIp";

export default factories.createCoreRouter('plugin::form-submissions.submission', {
  config: {
    create: {
      auth: false,
      middlewares: [
        (ctx, next) => {

          // console.log('strapi middleware--- ', ctx.res, next)

          return next();
        },
      ]
    },
    find: {
      auth: false
    },
    delete: {
      auth: false
    }
  }
});
