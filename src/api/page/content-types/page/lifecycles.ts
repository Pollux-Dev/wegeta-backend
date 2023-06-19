export default {
  afterCreate: async (event) => {
    console.log("After create:", event.result);

    const { data } = event.params;

    // return;

    const updatedData = {
      ...data,
      link: `localhost:3000/forms/${event.result.id}`,
    };

    const updated = await strapi.entityService.update(
      "api::page.page",
      event.result.id,
      {
        params: { id: data.id },
        data: updatedData,
      }
    );
    console.log("updated: ", updated);
  },

  async beforeCreate(event) {
    const { data } = event.params;

    // console.log("Before create:", event.model);

    /*const updatedData = {
      ...data,
      link: `localhost:3000/forms/${data.slug}`,
    };

    const updated = await strapi.entityService.update("api::page.page", {
      params: { id: data.id },
      data: updatedData,
    });
    console.log("updated: ", updated);*/
  },
};
