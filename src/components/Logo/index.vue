<template>
  <RouterLink
    class="flex items-center px-22px py-8px box-border gap-8px decoration-none font-bold overflow-hidden"
    to="/"
  >
    <img
      :src="logo"
      class="logo-image"
      alt=""
      :class="{ collapsed: collapse }"
    />
    <SvgIcon
      icon-name="logos:element"
      class="svg-icon"
      :class="{ collapsed: !collapse }"
    ></SvgIcon>
  </RouterLink>
</template>
<script lang="ts" setup>
import logo from "@/assets/element-plus-logo.svg";
import { RouterLink } from "vue-router";

const { collapse } = defineProps<{
  collapse: boolean;
}>();
</script>

<style lang="scss" scoped>
.logo-image {
  transition: all 0.3s ease;
  width: 100px;
  &.collapsed {
    width: 0;
    opacity: 0;
    margin-left: -8px; // 抵消 gap-8px 的影响
  }
}
.svg-icon {
  width: 20px; // 调整为你需要的图标大小
  height: 20px;
  opacity: 1;

  &.collapsed {
    opacity: 1;
    width: 0;
    height: 0;
  }
}
</style>
