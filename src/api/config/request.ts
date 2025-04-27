import axios from "axios";
import { getToken } from "@/utils/auth";
import { ElMessage } from "element-plus";
import { useClear } from "@/hooks/useClear";

const server = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json;charset=UTF-8"
  }
});
server.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

server.interceptors.response.use(
  (response) => {
    const res = response.data;
    if (res.code !== 0) {
      ElMessage.error(res.message);
      return Promise.reject(res.message);
    } else {
      return res;
    }
  },
  (error) => {
    const { response } = error;
    if (response) {
      const { status, data } = response;
      if (status === 401) {
        useClear();
        ElMessage.error("token过期，请重新登录");
        window.location.reload();
      } else if (status === 403) {
        ElMessage.error("没有权限，请联系管理员");
      } else if (status === 404) {
        ElMessage.error("请求的资源不存在");
      } else if (status === 500) {
        ElMessage.error("服务器内部错误");
      } else {
        ElMessage.error(data.message || "请求失败");
      }
    } else {
      ElMessage.error("网络异常，请稍后再试");
    }
    return Promise.reject(error);
  }
);
export default server;
export const get = (url: string, params?: any) => {
  return server.get(url, { params });
};
export const post = (url: string, data?: any) => {
  return server.post(url, data);
};
export const put = (url: string, data?: any) => {
  return server.put(url, data);
};
export const del = (url: string, params?: any) => {
  return server.delete(url, { params });
};
export const patch = (url: string, data?: any) => {
  return server.patch(url, data);
};
export const upload = (url: string, data: FormData) => {
  return server.post(url, data, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
};
export const download = (url: string, params?: any) => {
  return server.get(url, {
    params,
    responseType: "blob"
  });
};
