import type { RouteLocationNormalizedLoaded } from "vue-router";
type routeType = RouteLocationNormalizedLoaded & { title?: string };
export const useTagsViewStore = defineStore(
  "tag",
  () => {
    const routerCache = ref<string[]>([]); // 缓存路由
    const visitedViews = ref<routeType[]>([]);
    const addView = (view: routeType) => {
      addRouterCache(view);
      // 根据path去重
      const exists = visitedViews.value.some((v) => v.path === view.path);
      if (exists) return;
      // 添加视图时设置默认title
      const newView = {
        ...view,
        title: view.meta?.title || "tag-name"
      };
      visitedViews.value.push(newView);
    };
    const delView = (view: routeType) => {
      const index = visitedViews.value.findIndex((v) => v.path === view.path);
      if (index > -1) {
        visitedViews.value.splice(index, 1);
        delRouterCache(view);
      }
    };

    // 添加缓存的路由
    const addRouterCache = (view: routeType) => {
      const exists = routerCache.value.some((name) => name === view.name);
      if (!exists && view.name && !view.meta?.noCache) {
        routerCache.value.push(view.name as string);
      }
    };

    // 删除缓存的路由
    const delRouterCache = (view: routeType) => {
      const index = routerCache.value.indexOf(view.name as string);
      if (index) {
        routerCache.value.splice(index, 1);
      }
    };

    // 关闭所有close标签
    const handleCloseAllTag = () => {
      visitedViews.value = [];
      routerCache.value = [];
    };
    // 关闭其他
    const handleCloseOtherTag = (view: routeType) => {
      visitedViews.value = visitedViews.value.filter(
        (route) => route.name === view.name
      );
      routerCache.value = routerCache.value.filter(
        (name) => name === view.name
      );
    };
    return {
      visitedViews,
      routerCache,
      addView,
      delView,
      delRouterCache,
      handleCloseAllTag,
      handleCloseOtherTag
    };
  },
  {
    persist: {
      storage: window.localStorage,
      pick: ["visitedViews"]
    }
  }
);
