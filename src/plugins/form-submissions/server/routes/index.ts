

/*
* export default {
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
*/

import submission from "./submission";

export default {
  "form-submission": {
    routes: [
      {
        method: 'GET',
        path: '/',
        handler: 'myController.index',
        config: {
          auth: false,
          policies: [],
        },
      },
    ]
  },
  submission
};
