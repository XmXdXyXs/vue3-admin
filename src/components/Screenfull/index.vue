<template>
  <div
    class="h-50px w-50px cursor-pointer flex justify-center items-center hover:bg-gray-200"
    @click="handleClick"
  >
    <svg-icon
      :icon-name="
        isFullscreen
          ? 'ant-design:fullscreen-exit-outlined'
          : 'ant-design:fullscreen-outlined'
      "
      size-1.5em
    />
  </div>
</template>

<script lang="ts" setup>
import screenfull from "screenfull";
const isFullscreen = ref(false);
const { proxy } = getCurrentInstance()!;
const handleClick = () => {
  if (screenfull.isEnabled) {
    screenfull.toggle();
  } else {
    proxy?.$message({
      message: "当i请安浏览器不支持",
      type: "warning"
    });
  }
};
// 更新当前全屏状态
const updateFullscreenStatus = () => {
  isFullscreen.value = screenfull.isFullscreen;
};
// 监听全屏状态变化
const onFullscreenChange = () => {
  updateFullscreenStatus();
};
// 组件挂载时绑定事件
onMounted(() => {
  if (screenfull.isEnabled) {
    screenfull.on("change", onFullscreenChange);
    updateFullscreenStatus(); // 初始化全屏状态
  }
});
// 组件卸载时移除事件监听
onUnmounted(() => {
  if (screenfull.isEnabled) {
    screenfull.off("change", onFullscreenChange);
  }
});
</script>
