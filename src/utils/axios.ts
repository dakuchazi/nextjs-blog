import axios from "axios";
import { PRO_URL, DEV_URL } from "./constant";

const isDevelopment = process.env.NODE_ENV === "development";
const API_TOKEN = '91259756957659f89d8ee2e66fd7f2ce946d16555c66aba4c6ba7da93bcd32b08266589e1ee41b823e02f9f923ec6194c632ae699990a0c34cc849ce79124a1c0c84dc6f7e9f6d8c9fd79dd7c040980471e2fca7c03347c8388b191c33ee8373534d9706b59a365ae181cb4c2b7c5bce426183db5ec55db687bbedaba90f7ee5'; // 替换成你在 Strapi 后台生成的 API Token


const instance = axios.create({
  baseURL: isDevelopment ? DEV_URL : PRO_URL, // 本地开发时使用相对路径，生产环境中使用环境变量
  validateStatus: function (status) {
    return status < 500; //这个不写的话  默认只有200-299的状态码才会resolve，其余的都会reject
  },
  timeout: 50000,
  proxy: false // 禁用代理
});

instance.interceptors.request.use(
  function (config) {
    config.headers.Authorization = `Bearer ${API_TOKEN}`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// 响应拦截器可以简化一些
instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    console.error('请求错误:', error);
    return Promise.reject(error);
  }
);

export default instance;
