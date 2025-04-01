<template>
  <div class="flex w-full h-full">
    <div class="bg-red w-210px">sidebar</div>
    <div class="main-container flex flex-col flex-1">
      <div class="header h-84px">
        <div class="navbar h-50px bg-yellow">navbar</div>
        <div class="tags-view h-34px bg-blue">tagsview</div>
      </div>
      <div class="app-main bg-cyan h-[calc(100vh-84px)]">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
