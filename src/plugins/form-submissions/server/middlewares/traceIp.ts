/**
 * `traceIp` middleware
 */

import { Strapi } from '@strapi/strapi';


const transform = async (strapi, ctx, next) => {

  // console.log('strapi middleware--- ', ctx)


  // await next();


  // console.log('strapi middlewaree --- ', ctx)



  if (!ctx.body) {
    return;
  }
};

export default ({ strapi }) => {

  // console.log('strapi middleware--- ',)

  strapi.server.use((ctx, next) => transform(strapi, ctx, next));
};

/*

export default (config, { strapi }: { strapi: Strapi }) => {
  // Add your own logic here.
  console.log('strapi middleware--- ', config.req)

  return async (ctx, next) => {
    strapi.log.info('In traceIp middleware----------.', ctx, next);

    await next();

    const start = Date.now();
    await next();
    const delta = Math.ceil(Date.now() - start);

    strapi.log.http(`${ctx.method} ${ctx.url} (${delta} ms) ${ctx.status}`);


  };
};
*/
