import { Schema } from "@strapi/strapi/lib/types/core/schemas";

const schema = {
  kind: "collectionType",
  collectionName: "submissions",
  info: {
    singularName: "submission",
    pluralName: "submissions",
    displayName: "submission",
  },
  options: {
    draftAndPublish: false,
    comment: "",
  },
  pluginOptions: {
    timestamps: true,
    "content-manager": {
      visible: true,
    },
    "content-type-builder": {
      visible: true,
    },
  },
  attributes: {
    formTitle: {
      type: "string",
      configurable: false,
    },
    formId: {
      type: "integer",
      configurable: false,
    },
    formData: {
      type: "json",
      configurable: false,
    },
    seen: {
      type: "boolean",
      default: false,
    },
    form: {
      type: "relation",
      relation: "manyToOne",
      target: "api::page.page",
      inversedBy: "submissions",
      configurable: true,
    },
  },
} as Partial<Schema>;
export default { schema };
