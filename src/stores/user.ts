import { login as loginApi } from "@/api/user";
import type { UserLoginData } from "@/modal/userModal";
import { setToken } from "@/utils/auth";
export const useStore = defineStore(
  "user",
  () => {
    const state = reactive({
      token: "",
      userName: ""
    });
    const login = async (data: UserLoginData) => {
      try {
        const res = await loginApi(data);
        const { token } = res.data;
        state.token = token;
        setToken(token);
      } catch (error) {
        return Promise.reject(error);
      }
    };
    const setUserName = (name: string) => {
      state.userName = name;
    };
    const userClear = () => {
      state.userName = "";
      state.token = "";
    };
    return { state, login, setUserName, userClear };
  },
  {
    persist: {
      storage: window.localStorage,
      pick: ["state"]
    }
  }
);
