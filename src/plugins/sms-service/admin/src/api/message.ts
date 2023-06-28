import { request } from "@strapi/helper-plugin";

const messageRequests = {
  getAllMessages: async () => {
    return await request("/sms-service/messages", {
      method: "GET",
    });
  },

  addMessage: async (data: any) => {
    return await request(`/sms-service/messages`, {
      method: "POST",
      body: { data: data },
    });
  },

  editMessage: async (id: any, data: any) => {
    return await request(`/sms-service/messages/${id}`, {
      method: "PUT",
      body: { data: data },
    });
  },

  deleteMessage: async (id: any) => {
    return await request(`/sms-service/messages/${id}`, {
      method: "DELETE",
    });
  },
};

export default messageRequests;
