import axios from "axios";
import { store } from "../store";
import { setAccessToken } from "../slices/loginSlice";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8083/api",
  // 쿠키 허용
  withCredentials: true,
});

const refreshJWT = async () => {
  const res = await axiosInstance.get(`/member/refresh`);

  console.log("----------------------");
  console.log(res.data);

  return res.data;
};

axiosInstance.interceptors.request.use(
  (config) => {
    const token = store.getState().loginSlice.accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (res) => {
    console.log("interceptor res: ", res);
    if (res.data && res.data.error === "ERROR_ACCESS_TOKEN") {
      const result = await refreshJWT();
      console.log("refreshJWT RESULT", result);

      const accessToken = result.data.accessToken;

      store.dispatch(setAccessToken(accessToken));

      return axiosInstance(res.config);
    }
    return Promise.reject(res);
  }
);

export default axiosInstance;
