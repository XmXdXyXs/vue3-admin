<template>
  <div class="layoutContainner flex w-full h-full">
    <div class="siderBarContainner"><SideBar></SideBar></div>
    <div class="main-container flex flex-col flex-1 overflow-hidden">
      <div class="header">
        <Navbar />
        <div class="tags-view h-34px" v-if="setting.tagViewsVisiable">
          <TagView />
        </div>
      </div>
      <AppMain
        :class="[
          setting.tagViewsVisiable
            ? 'h-[calc(100vh-84px)]'
            : 'h-[calc(100vh-50px)]'
        ]"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useSetting } from "@/stores/setting";
const store = useSetting();
const { setting } = storeToRefs(store);
</script>
<style lang="scss" scoped>
.layoutContainner {
  .siderBarContainner {
    :deep(.sidebar-container-menu:not(.el-menu--collapse)) {
      width: 210px;
    }
  }
}
</style>
