<template>
  <div class="hamburger-container">
    <svg-icon
      icon-name="ant-design:bars-outlined"
      custom-class="hamburger size-1.5em"
      @click="handleClick"
    ></svg-icon>
  </div>
</template>

<style scoped lang="scss">
.hamburger-container {
  @apply w-50px h-50px cursor-pointer hover:bg-gray-200 flex justify-center items-center;
}
</style>

<script lang="ts" setup>
const emit = defineEmits<{ (e: "toggleCollapse"): void }>();
const handleClick = () => {
  emit("toggleCollapse");
};
</script>
