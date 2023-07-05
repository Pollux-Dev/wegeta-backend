import axios from "axios";
import { auth } from "@strapi/helper-plugin";

const { getToken } = auth;

// const token = await getToken()

const TOKEN =
  `401d0f29f412aaf45524813634f62cff5a7304cbb08b816b8d269beff5e4267bb7d4986969d065b778f246fbe34bf78d2490b651a08cfa10258fabfff90c3ab67697051fdec4f6d158e07373caebc811856e5820eabdac3815d69ae9d7ec797efa899cdb1136ea47d859e330b66d048c65225c034969c1c8582dad44ae80d963`;

console.log("token : ", process.env.JWT_TOKEN);

export const Submissions = axios.create({
  baseURL: "http://localhost:1337/",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + TOKEN,
  },
});
