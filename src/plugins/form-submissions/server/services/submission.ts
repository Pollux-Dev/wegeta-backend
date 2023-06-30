/**
 *  service
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreService('plugin::form-submissions.submission', ({strapi}) => ({
  /*async find(...args) {
    // Calling the default core controller
    const { results, pagination } = await super.find(...args);

    console.log('create ----> results: ', results, this)


    // some custom logic
    // results.forEach(result => {
    //   result.counter = 1;
    // });

    return { results, pagination };
  },*/

  async create(entityId, params = {}) {

    console.log('create ----> entityId: ', entityId, params)

    const submission = await strapi.entityService.create('plugin::form-submissions.submission', entityId);
    const updatedForm = await strapi.entityService.update('api::page.page', Number(submission.formId), {
      data: {
        submissions: {
          connect: [
            {
              id: submission.id,
              position: {
                end: true,
              },
            },
          ],
        }
      }
    });

    // console.log('upaatedForm ----> ', updatedForm)
    // console.log('submission ----> ', submission)

    return submission;
  }
}));
