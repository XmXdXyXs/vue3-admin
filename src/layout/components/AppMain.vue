<template>
  <div
    class="app-main h-[calc(100vh-84px)] overflow-hidden relative px-[12px] py-[12px] box-border"
  >
    <BreadCrumbLevel />
    <router-view v-slot="{ Component, route }">
      <transition name="fade" mode="out-in">
        <keep-alive :include="routerCache">
          <component :is="Component" :key="route.path"></component>
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<script lang="ts" setup>
import { useTagsViewStore } from "@/stores/tagsView";
const store = useTagsViewStore();
const { routerCache } = storeToRefs(store);
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s;
}
.fade-enter-from {
  opacity: 0;
  transform: translateX(-60px);
}
.fade-leave-to {
  opacity: 0;
  transform: translateX(60px);
}
</style>
