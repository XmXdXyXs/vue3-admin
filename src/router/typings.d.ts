import "vue-router";

// 给router属性添加额外ts类型
declare module "vue-router" {
  interface RouteMeta {
    icon?: string;
    title?: string;
    hidden?: boolean;
    alwaysShow?: boolean;
  }
}
