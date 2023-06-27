export default {
  afterCreate: async (event) => {
    console.log("After create:", event.result);

    const { data } = event.params;

    if (!event.result?.publish_at || !event.result?.link) {
      return;
    }

    const updated = await strapi.entityService.update(
      "api::page.page",
      event.result.id,
      {
        data: {
          link: `localhost:3000/forms/${event.result.id}`,
        },
      }
    );
    console.log("updated: ", updated);
  },

  async afterUpdate(event) {
    const { data } = event.params;
    console.log("afterUpdate : ", event);
    if (event.result?.link) {
      return;
    }

    if (!event.result?.publishedAt || event.result?.form?.length === 0) {
      return;
    }

    const updated = await strapi.entityService.update(
      "api::page.page",
      event.result.id,
      {
        data: {
          link: `localhost:3000/forms/${event.result.id}`,
        },
      }
    );

    console.log("updated data --> : ", updated);
  },
};
