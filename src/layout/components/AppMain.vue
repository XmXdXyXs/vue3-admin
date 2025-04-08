<template>
  <div
    class="app-main bg-cyan h-[calc(100vh-84px)] overflow-hidden relative px-[12px] py-[12px] box-border"
  >
    <router-view v-slot="{ Component, route }">
      <transition name="fade" mode="out-in">
        <keep-alive>
          <component :is="Component" :key="route.path"></component>
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

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
