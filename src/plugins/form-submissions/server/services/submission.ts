/**
 *  service
 */

import { factories } from "@strapi/strapi";
import FormEvent from "../../admin/src/utils/FormEvent";

const formEvent = FormEvent.GetInstance();


export default factories.createCoreService(
  "plugin::form-submissions.submission",
  ({ strapi }) => ({
    async create(entityId, params = {}) {
      console.log("create ----> entityId: ", entityId, params);


      const submission = await strapi.entityService.create(
        "plugin::form-submissions.submission",
        entityId
      );

      console.log('submission ----> ', submission);

      // connect the new form-submission to the corresponding form
      const updatedForm = await strapi.entityService.update(
        "api::page.page",
        submission.formId,
        {
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
            },
          },
        }
      );


      if (updatedForm){
        // emit event to update the adimn UI
        formEvent.emit("submission", submission);
      }


      console.log('upaatedForm ----> ', updatedForm)
      console.log('submission ----> ', submission)

      return submission;
    },
  })
);
