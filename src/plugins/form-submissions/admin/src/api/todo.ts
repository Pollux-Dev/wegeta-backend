import { request } from "@strapi/helper-plugin";
import { Submissions } from "./submissions";
import {AxiosRequestConfig} from "axios";

const todoRequests = {
  getAllTodos: async () => {
    return await request("/todo/find", {
      method: "GET",
    });
  },

  getFormsWithSubmission: async <T=any>(config?: AxiosRequestConfig<T>) => {
    return await Submissions.get("/form-submissions/submissions", {
      params: {
        populate: "*",
      },
      ...config,
    })
      .then((res) => {
        const formIds = new Set();

        // console.log('submissions: ', res.data.data)

        res.data.data.forEach((submission: any) => {
          // console.log("submission: ", submission);
          // todo : change the ID to number
          formIds.add(Number(submission.attributes.formId));
        });
        // console.log("submissions: ", Array.from(formIds));

        return Array.from(formIds);
      })
      .catch((err) => {
        // throw err;
        console.log("err fetching formsWithSubmission: ", err);
        return [];
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
