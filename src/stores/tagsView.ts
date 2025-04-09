import type { RouteLocationNormalizedLoaded } from "vue-router";
type routeType = RouteLocationNormalizedLoaded & { title?: string };
export const useTagsViewStore = defineStore("tag", () => {
  const visitedViews = ref<routeType[]>([]);
  const addView = (view: routeType) => {
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
    }
  };
  return { visitedViews, addView, delView };
});
