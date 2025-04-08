<template>
  <div class="layoutContainner flex w-full h-full">
    <div class="siderBarContainner"><SideBar></SideBar></div>
    <div class="main-container flex flex-col flex-1">
      <div class="header h-84px">
        <Navbar />
        <div class="tags-view h-34px bg-blue">tagsview</div>
      </div>
      <AppMain />
    </div>
  </div>
</template>
<style lang="scss" scoped>
.layoutContainner {
  .siderBarContainner {
    :deep(.sidebar-container-menu:not(.el-menu--collapse)) {
      width: 210px;
    }
  }
}
</style>
