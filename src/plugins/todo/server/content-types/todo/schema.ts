import { Schema } from "@strapi/strapi/lib/types/core/schemas";

export default {
  modelType: "contentType",
  kind: "collectionType",
  collectionName: "todos",
  info: {
    singularName: "todo",
    pluralName: "todos",
    displayName: "Todo",
    description: "A todo item",
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
      visible: false,
    },
  },
  attributes: {
    name: {
      type: "string",
      required: true,
      maxLength: 40,
    },
    timeAllocated: {
      type: 'time',
      default: '00:00:00',
    },
    isDone: {
      type: "boolean",
      default: false,
    },
  },
} as Partial<Schema>;
