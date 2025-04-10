<template>
  <el-breadcrumb separator="/" class="text-14px mb-8px">
    <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
      <span v-if="index === levelList.length - 1" cursor-text>
        {{ item.meta?.title }}
      </span>
      <a v-else @click.prevent="handleLink(item)">
        {{ item.meta?.title }}
      </a>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script lang="ts" setup>
import type { RouteLocationMatched } from "vue-router";
import { compile } from "path-to-regexp";
const router = useRouter();
const route = useRoute();
type PartialRouteLocationMatched = Partial<RouteLocationMatched>;

const levelList = ref<PartialRouteLocationMatched[]>([]);

// 例如：动态路径是 /user/:class/role/:id 我们要将
// {id: 2, class: 3}填充为完整路径 然后才能正确跳转
// const { compile } = require("path-to-regexp");
// const toPath = compile("/user/:class/role/:id");
// const path = toPath({ id: 2, class: 3 });
// console.log("path:", path); // path:
// 1.判断是不是Dashboard路由
const isDashboard = (route?: PartialRouteLocationMatched): boolean => {
  return route?.path === "/dashboard";
};
// 2.获取⾯包屑导航
const getBreadcrumb = () => {
  // 1).有title才可以上⾯包屑导航
  let matched = route.matched.filter(
    (item) => item.meta?.title
  ) as PartialRouteLocationMatched[];
  // 2).第⼀个不是dashboard，在前⾯增加dashboard
  if (!isDashboard(matched[0])) {
    matched = [
      {
        path: "/dashboard",
        meta: {
          title: "dashboard"
        }
      },
      ...matched
    ];
  }
  // 过滤掉breadcrumb为false的情况
  levelList.value = matched.filter((item) => item.meta?.breadcrumb !== false);
};

const pathCompile = (path: string) => {
  const toPath = compile(path);
  const params = route.params;
  return toPath(params);
};
const handleLink = (route: PartialRouteLocationMatched) => {
  const { path, redirect } = route;
  // 如果是重定向路由 就⾛重定向路径
  if (redirect) {
    router.push(redirect as string);
    return;
  }
  router.push(pathCompile(path!));
};
watch(() => route.path, getBreadcrumb, {
  immediate: true
});
</script>
