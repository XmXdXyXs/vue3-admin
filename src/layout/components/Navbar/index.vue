<template>
  <div class="navbar h-50px flex justify-between">
    <Hamburger @click="toggleSilder" />
    <Screenfull />
  </div>
</template>

<script setup lang="ts">
import { useAppStrore } from "@/stores/app";

const { toggleSilder } = useAppStrore();
</script>

<style lang="scss" scoped></style>
