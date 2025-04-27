<template>
  <el-dropdown>
    <div class="flex items-center justify-center px-8px cursor-pointer">
      {{ state.userName }}
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <router-link to="/">
          <el-dropdown-item>⾸⻚</el-dropdown-item>
        </router-link>
        <router-link to="/profile/index">
          <el-dropdown-item>个⼈设置</el-dropdown-item>
        </router-link>

        <el-dropdown-item divided @click="logout">
          <span block>退出登录</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
<script lang="ts" setup>
import { useClear } from "@/hooks/useClear";
import { useStore } from "@/stores/user";
const store = useStore();
const { state } = storeToRefs(store);
const logout = () => {
  useClear();
  window.location.reload();
};
</script>
