export default [
  {
    method: "GET",
    path: "/",
    handler: "myController.index",
    config: {
      policies: [],
      auth: false,
    },
  },

  {
    method: "GET",
    path: "/find",
    handler: "todo.find",
    config: {
      policies: [],
      auth: false,
    },
  },

  {
    method: "POST",
    path: "/create",
    handler: "todo.create",
    config: {
      policies: [],
    },
  },

  {
    method: "DELETE",
    path: "/delete/:id",
    handler: "todo.delete",
    config: {
      policies: [],
    },
  },

  {
    method: "PUT",
    path: "/toggle/:id",
    handler: "todo.toggle",
    config: {
      policies: [],
    },
  },

  {
    method: "PUT",
    path: "/update/:id",
    handler: "todo.update",
    config: {
      policies: [],
    },
  },
];

// kill running port in arch linux
// sudo lsof -i :1337
// kill -9 <PID>
// fuser -k 1337/tcp
