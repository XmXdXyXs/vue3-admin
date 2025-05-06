export interface IRole {
  id?: number;
  name: string;
  description: string;
  is_default: number;
  createdAt: string;
  updatedAt: string;
}
// 定义state类型
export interface IRoleState {
  roles: IRole[];
  count: number;
}
// 获取⻆⾊
export interface RoleParams {
  pageNum: number;
  pageSize: number;
}

export type ActionRoleParams = IRole & {
  pageSize: number;
  pageNum: number;
};
