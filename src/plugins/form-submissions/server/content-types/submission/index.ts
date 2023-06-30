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
      visible: false,
    },
    "content-type-builder": {
      visible: false,
    },
  },
  attributes: {
    formTitle: {
      type: "string",
      configurable: false,
    },
    formId: {
      type: "string",
      configurable: false,
    },
    formData: {
      type: "json",
      configurable: false,
    },
    form: {
      type: "relation",
      relation: "manyToOne",
      target: "api::page.page",
      inversedBy: "submissions",
      configurable: true,
    },
  },
};

export default { schema };
