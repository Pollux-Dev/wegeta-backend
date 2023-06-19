import { Strapi } from "@strapi/strapi";

export default async ({ strapi }: { strapi: Strapi }) => {
  // bootstrap phase


  return;

  const publicRole = await strapi
    .query("plugin::users-permissions.role")
    .findOne({
      where: {
        type: "public",
      },
    });

  console.log('pubic role: ', publicRole)

  const newPermissions = {
    message: ["find", "findOne"],
  };

  // Create the new permissions and link them to the public role
  const allPermissionsToCreate = [];
  Object.keys(newPermissions).map((contentType) => {
    const actions = newPermissions[contentType];
    const permissionsToCreate = actions.map((action) => {
      return strapi.query("plugin::users-permissions.permission").create({
        data: {
          action: `api::${contentType}.${contentType}.${action}`,
          role: publicRole.id,
        },
      });
    });

    console.log('permissionsToCreate  ------------------------:', permissionsToCreate)

    allPermissionsToCreate.push(...permissionsToCreate);
  });
  const res = await Promise.all(allPermissionsToCreate);
  console.log('res: ', res)
};
