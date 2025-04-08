<template>
  <div class="bg-[var(--color-menu-bg)] h-full">
    <el-menu
      router
      border-none
      class="sidebar-container-menu"
      :default-active="defaultActive"
      background-color="var(--color-menu-bg)"
      text-color="var(--color-menu-text)"
      active-text-color="var(--color-menu-active-text)"
      :collapse="silder.opened"
    >
      <sidebarItem
        v-for="item in routes"
        :key="item.path"
        :item="item"
        :base-path="item.path"
      ></sidebarItem>
    </el-menu>
  </div>
</template>

<script lang="ts" setup>
import { routes } from "@/router";
import { useAppStrore } from "@/stores/app";
const store = useAppStrore();
const { silder } = store;
const route = useRoute();

const defaultActive = computed(() => {
  return route.path;
});
</script>

<style lang="scss" scoped></style>
