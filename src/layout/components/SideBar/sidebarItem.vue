<template>
  <el-menu-item
    :index="singleChildRoute.path"
    v-if="filteredChildren.length <= 1"
  >
    <el-icon>
      <svg-icon :iconName="iconName" custom-class="w-15px h-15px" />
    </el-icon>
    <template #title>{{ singleChildRoute.meta?.title }}</template>
  </el-menu-item>
  <el-sub-menu :index="item.path" v-else>
    <template #title>
      <el-icon v-if="iconName">
        <svg-icon :icon-name="iconName" />
      </el-icon>
      <span>{{ item.meta?.title }}</span>
    </template>
    <sidebarItem
      v-for="child in item.children"
      :key="child.path"
      :item="child"
    ></sidebarItem>
  </el-sub-menu>
</template>
<script lang="ts" setup>
import type { RouteRecordRaw } from "vue-router";
const { item } = defineProps<{
  item: RouteRecordRaw;
}>();

const filteredChildren = computed(() => {
  return item.children || [];
});

const singleChildRoute = computed(() => {
  return filteredChildren.value.length === 1 ? filteredChildren.value[0] : item;
});

// 3.⼦路由 如果没有icon就⽤⽗路由的
const iconName = computed(() =>
  String(
    singleChildRoute.value?.meta?.icon || (item.meta && item.meta.icon) || ""
  )
);
</script>
