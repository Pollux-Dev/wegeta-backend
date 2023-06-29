import axios from "axios";
import { auth } from "@strapi/helper-plugin";
const { getToken } = auth;

// const token = await getToken()

console.log('token : ', process.env.JWT_TOKEN)
const token = '07dc243efc559f3fea5281a5f30848a9a5bfcebe62dce658bfeca9e3eaa58190e0ae99b1430a33d7285bbc2df395bc319a2c338f1f7ce044effb0662086a3f7ac4eef4b26e455a20d018b86f3cddf51c613bea41172b8df3249ae1a966c19435557c8f9d1daf8fd73cfdb16aa7e21ecd443634fac0089f66343604dde68f0800'

export const Submissions = axios.create({
  baseURL: "http://localhost:1337/",
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer " + token,
  }
});
