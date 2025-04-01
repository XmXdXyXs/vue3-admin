<template>
  <div class="text-red"><el-button @click="handleMessage">点击</el-button></div>
</template>

<script lang="ts" setup>
const { proxy } = getCurrentInstance()!;
const handleMessage = () => {
  proxy?.$message({
    message: "恭喜你，这是一条成功消息",
    type: "success"
  });
};
</script>
