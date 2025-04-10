import "vue-router";

// 给router属性添加额外ts类型
declare module "vue-router" {
  interface RouteMeta {
    icon?: string; // icon
    title?: string; // 标题
    hidden?: boolean; // 此路由是否展示
    alwaysShow?: boolean; // 是否在导航上一直显示
    breadcrumb?: boolean; // 是否在面包屑上展示
    noCache?: boolean; // 是否开启缓存
  }
}
