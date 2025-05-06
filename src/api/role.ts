import request from "@/api/config/request";

import type { ApiResponse } from "./type";
import type { IRoleState, IRole } from "@/modal/roleModal";

// 获取角色
export const getRolesApi = (
  params = { pageNum: 0, pageSize: 10 }
): Promise<ApiResponse<IRoleState>> => {
  return request.get("/role", {
    params
  });
};

// 删除⻆⾊
export const removeRoleApi = (id: number): Promise<ApiResponse> => {
  return request.delete(`/role/${id}`);
};

// 添加⻆⾊
export const addRoleApi = (data: IRole): Promise<ApiResponse> => {
  return request.post("/role", data);
};

// 编辑⻆⾊
export const updateRoleApi = (
  id: number,
  data: IRole
): Promise<ApiResponse> => {
  return request.put(`/role/${id}`, data);
};
