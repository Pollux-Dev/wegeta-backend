import message from "./message";

export default {
  "sms-service": {
    routes: [
      {
        method: "GET",
        path: "/",
        handler: "myController.index",
        config: {
          policies: [],
          auth: false,
        },
      },
    ],
  },
  message,
};
