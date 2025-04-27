import { removeToken } from "@/utils/auth";
import { useTagsViewStore } from "@/stores/tagsView";
import { useStore } from "@/stores/user";

export const useClear = () => {
  const store = useTagsViewStore();
  const userStore = useStore();
  const { handleCloseAllTag } = store;
  const { userClear } = userStore;
  // 清除token
  removeToken();
  // 清除用户信息
  userClear();
  // 清除标签页
  handleCloseAllTag();
};
