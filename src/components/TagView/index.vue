<template>
  <div class="w-full h-34px px-4px box-border flex items-center bg-[#f5f5f5]">
    <div class="flex justify-center items-center w-26px h-26px">
      <SvgIcon
        icon-name="iconamoon:arrow-left-2-fill"
        custom-class="w-20px h-20px cursor-pointer hover:bg-gray-200"
        @click="move(-100)"
      ></SvgIcon>
    </div>
    <el-scrollbar ref="scrollbarRef" class="w-[calc(100%-52px)]">
      <div class="flex gap-[4px] items-center h-34px">
        <div
          v-for="(tag, index) in visitedViews"
          :key="tag.path"
          class="h-24px min-w-40px border border-solid border-1px border-[rgba(158,170,204,.6)] flex justify-center items-center flex-shrink-0 cursor-pointer rounded-1px hover:bg-gray-200"
          :class="[tag.name === route.name && 'bg-[rgba(158,170,204,.2)]']"
        >
          <el-dropdown
            ref="dropDownRef"
            placement="bottom"
            trigger="contextmenu"
            @visible-change="
              (visible: boolean) => visibleChange(visible, index)
            "
            @command="(common) => handleSelectMenu(common, tag)"
          >
            <RouterLink
              :to="{ path: tag.path, query: tag.query }"
              class="text-[#121212] px-6px decoration-none"
              :class="[
                tag.name === route.name &&
                  '!text-[var(--color-menu-active-text)]'
              ]"
            >
              <div class="flex items-center gap-[2px]">
                <SvgIcon :iconName="tag.meta.icon!" />
                <div class="text-14px">{{ tag.title }}</div>
                <SvgIcon
                  @click.prevent.stop="closeSelectedTag(tag)"
                  iconName="ei:close"
                  custom-class="mt-2px"
                />
              </div>
            </RouterLink>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="All">
                  <div>
                    <SvgIcon
                      iconName="material-symbols:tab-close"
                      custom-class="size-1.3em mr-5px"
                    ></SvgIcon
                    >关闭所有
                  </div>
                </el-dropdown-item>
                <el-dropdown-item command="Other">
                  <div>
                    <SvgIcon
                      iconName="material-symbols:tab-close-outline"
                      custom-class="size-1.3em mr-5px"
                    ></SvgIcon
                    >关闭其他
                  </div></el-dropdown-item
                >
                <el-dropdown-item command="Current"
                  ><div>
                    <SvgIcon
                      iconName="ant-design:close-square-twotone"
                      custom-class="size-1.2em mr-1px"
                    ></SvgIcon>
                    关闭当前
                  </div>
                </el-dropdown-item>
                <el-dropdown-item
                  command="Refresh"
                  :disabled="tag.name !== route.name"
                >
                  <div>
                    <SvgIcon
                      iconName="mingcute:refresh-1-fill"
                      custom-class="size-1.2em mr-1px"
                    ></SvgIcon>
                    刷新
                  </div></el-dropdown-item
                >
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </el-scrollbar>
    <div class="flex justify-center items-center w-26px h-26px">
      <SvgIcon
        custom-class="w-20px h-20px cursor-pointer hover:bg-gray-200"
        icon-name="iconamoon:arrow-right-2-fill"
        @click="move(100)"
      ></SvgIcon>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { RouteLocationNormalizedLoaded } from "vue-router";
type routeType = RouteLocationNormalizedLoaded & { title?: string };
const scrollLeftNumber = ref(0);
import { useTagsViewStore } from "@/stores/tagsView";

import { ElScrollbar } from "element-plus";
import { useScrollTo } from "@/hooks/useScrollTo";

const scrollbarRef = ref<any>();
const dropDownRef = ref<any>();
const store = useTagsViewStore();
const { visitedViews } = storeToRefs(store);
const { handleCloseAllTag, handleCloseOtherTag, delRouterCache } = store;
const route = useRoute();
const addTags = () => {
  const { name } = route; // 只有有name的路由才去保存
  if (name) {
    store.addView(route);
  }
};

const router = useRouter();
const toLastView = (visitedViews: routeType[], view: routeType) => {
  const lastView = visitedViews[visitedViews.length - 1];
  if (lastView) {
    router.push(lastView.path);
  } else {
    // tag都没有了 删除的也不是Dashboard 只能跳转⾸⻚
    // router.push("/");
  }
};
const closeSelectedTag = (tag: routeType) => {
  store.delView(tag);
  if (tag.name === route.name) {
    toLastView(visitedViews.value, tag);
  }
};

watch(
  () => route.path,
  () => {
    addTags();
  },
  { immediate: true }
);

const enum TagCommondType {
  All = "All",
  Other = "Other",
  Current = "Current",
  Refresh = "Refresh"
}
const handleSelectMenu = (value: string, view: routeType) => {
  switch (value) {
    case TagCommondType.All:
      handleCloseAllTag();
      break;
    case TagCommondType.Other:
      handleCloseOtherTag(view);
      if (route.name !== view.name) {
        router.push({ path: view.path });
      }

      break;
    case TagCommondType.Current:
      closeSelectedTag(view);
      break;
    case TagCommondType.Refresh:
      delRouterCache(view);
      router.push({
        path: `/redirect${view.path}`,
        query: view.query
      });
      break;
  }
};

// 移动到某个位置
const move = (to: number) => {
  const wrap$ = unref(scrollbarRef)?.wrapRef;
  scrollLeftNumber.value += to;
  const { start } = useScrollTo({
    el: wrap$!,
    position: "scrollLeft",
    to: unref(scrollLeftNumber) + to,
    duration: 500
  });
  start();
};

// 右键菜单装填改变的时候
const visibleChange = (visible: boolean, index: number) => {
  if (visible) {
    for (const v of dropDownRef.value) {
      const elDropdownMenuRef = v;
      elDropdownMenuRef?.handleClose();
    }
    dropDownRef.value[index]?.handleOpen();
  }
};
</script>

<style scoped lang="scss"></style>
