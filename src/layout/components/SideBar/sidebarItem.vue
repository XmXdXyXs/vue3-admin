<template>
  <template v-if="!item.meta?.hidden">
    <el-menu-item
      :index="reslovePath(singleChildRoute.path)"
      v-if="filteredChildren.length <= 1 && !item.meta?.alwaysShow"
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
        :base-path="reslovePath(child.path)"
      ></sidebarItem>
    </el-sub-menu>
  </template>
</template>
<script lang="ts" setup>
import type { RouteRecordRaw } from "vue-router";
import path from "path-browserify";
const { item, basePath } = defineProps<{
  item: RouteRecordRaw;
  basePath: string;
}>();

// 1.拿到当前路由的孩子 根据hidden把不显示的孩子剔除出去
// 注意 hideen 只是控制是否在子菜单显示 实际不管值为false 还是 true 实际都是已经注册了的
const filteredChildren = computed(() => {
  return (item.children || []).filter((item) => !item.meta?.hidden);
});

// 2.如果只有一个孩子 那就用这个孩子本身去渲染菜单
const singleChildRoute = computed(() => {
  return filteredChildren.value.length === 1 && !item.meta?.alwaysShow
    ? filteredChildren.value[0]
    : { ...item, path: "" };
});

// 3.⼦路由 如果没有icon就⽤⽗路由的
const iconName = computed(() =>
  String(
    singleChildRoute.value?.meta?.icon || (item.meta && item.meta.icon) || ""
  )
);

const reslovePath = (childrenPath: string) => {
  return path.join(basePath, childrenPath);
};
</script>
