<template>
  <div class="navbar h-50px">
    <BreadCrumb @click="toggleSilder" />
  </div>
</template>

<script setup lang="ts">
import { useAppStrore } from "@/stores/app";

const { toggleSilder } = useAppStrore();
</script>

<style lang="scss" scoped></style>
