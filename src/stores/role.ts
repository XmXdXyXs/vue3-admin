import type { IRole, RoleParams, ActionRoleParams } from "@/modal/roleModal";
import {
  getRolesApi,
  addRoleApi,
  updateRoleApi,
  removeRoleApi
} from "@/api/role";

export const useRoleStore = defineStore("role", () => {
  // 状态
  const state = reactive({
    roles: [] as IRole[],
    count: 0
  });

  // 获取角色
  const getRoles = async (params: RoleParams) => {
    const res = await getRolesApi(params);
    const { data } = res;
    state.roles = data.roles;
    state.count = data.count;
  };

  // 添加⻆⾊
  const addRole = async (data: ActionRoleParams) => {
    const { pageSize, pageNum, ...params } = data;
    const res = await addRoleApi(params);
    if (res.code === 0) {
      getRoles({ pageSize, pageNum });
    }
  };

  // 编辑⻆⾊
  const editRole = async (data: ActionRoleParams) => {
    const { pageSize, pageNum, ...params } = data;
    const res = await updateRoleApi(params.id!, params);
    if (res.code === 0) {
      getRoles({ pageSize, pageNum });
    }
  };

  const removeRole = async (data: ActionRoleParams) => {
    const { pageSize, pageNum, id } = data;
    const res = await removeRoleApi(id!);
    if (res.code === 0) {
      getRoles({ pageSize, pageNum });
    }
  };
  return { getRoles, addRole, editRole, removeRole, state };
});
