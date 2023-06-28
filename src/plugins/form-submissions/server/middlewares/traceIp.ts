/**
 * `traceIp` middleware
 */

import { Strapi } from '@strapi/strapi';

export default (config, { strapi }: { strapi: Strapi }) => {
  // Add your own logic here.
  console.log('strapi middleware ---------------- ')

  return async (ctx, next) => {
    strapi.log.info('In traceIp middleware.');

    await next();
  };
};
