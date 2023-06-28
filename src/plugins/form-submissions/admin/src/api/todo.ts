import { request } from "@strapi/helper-plugin";

const todoRequests = {
  getAllTodos: async () => {
    return await request("/todo/find", {
      method: "GET",
    });
  },

  getAllPages: async () => {
    return await request("/api/pages/", {
      method: "GET",
    });
  },

  addTodo: async (data: any) => {
    return await request(`/todo/create`, {
      method: "POST",
      body: { data: data },
    });
  },

  toggleTodo: async (id: string | number) => {
    return await request(`/todo/toggle/${id}`, {
      method: "PUT",
    });
  },

  editTodo: async (id: any, data: any) => {
    return await request(`/todo/update/${id}`, {
      method: "PUT",
      body: { data: data },
    });
  },

  deleteTodo: async (id: any) => {
    return await request(`/todo/delete/${id}`, {
      method: "DELETE",
    });
  },
};

export default todoRequests;
