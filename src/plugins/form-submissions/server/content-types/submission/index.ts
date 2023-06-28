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
    formName: {
      type: "string",
      min: 1,
      max: 50,
      configurable: false,
    },
    data: {
      type: "json",
      configurable: false,
    },
   /* form: {
      type: 'relation',
      relation: 'manyToOne',
      target: 'page'
    }*/
  },
};

export default { schema };
