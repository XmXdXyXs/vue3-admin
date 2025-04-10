<template>
  <el-dropdown>
    <div class="flex items-center justify-center px-8px cursor-pointer">
      jay sun
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
const logout = () => {
  console.log("退出登录");
};
</script>
