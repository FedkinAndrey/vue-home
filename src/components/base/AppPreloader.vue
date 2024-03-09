<script setup lang="ts"></script>

<template>
  <div class="preloader">
    <v-progress-circular :style="{ zIndex: 1001 }" color="primary" indeterminate></v-progress-circular>
  </div>
</template>

<style scoped lang="scss">
.preloader {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
}
</style>
