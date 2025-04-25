import request from "./config/request";
import type { UserLoginData, LoginResponseData } from "@/modal/userModal";
import type { ApiResponse } from "./type";

export const login = (
  data: UserLoginData
): Promise<ApiResponse<LoginResponseData>> => {
  return request.post("/auth/login", data);
};
