import axios from "axios";
import { auth } from "@strapi/helper-plugin";

const { getToken } = auth;

// const token = await getToken()

const TOKEN =
  `716620c3de9eee3a43c9d2f7f4927d648d910b32864a7af78e9c647074f23412470d7b4000c54cd1f883952f1038fd798c16e54dddc799d0492ee6eefd0a75d6bd4f79d1fdfeacbfd4f0c48b5a5b52cc39ca48a0e80eec9d2657a1beab61e4e625384cb9af8c7bb190a0d1264516436a4456d6fc22ff2798cf8291c0ad943d22`;

console.log("token : ", process.env.JWT_TOKEN);

export const Submissions = axios.create({
  baseURL: "http://localhost:1337/",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + TOKEN,
  },
});
