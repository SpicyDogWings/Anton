<script setup lang="ts">
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - Anton` : "Anton";
  },
});
</script>

<template>
  <section class="w-full h-screen flex justify-start items-center flex-col">
    <section class="mt-20 w-10/12 flex justify-start items-start flex-col">
      <slot />
    </section>
  </section>
</template>

<style>
@import "assets/css/anton.css";
@import "assets/css/general-sans.css";
</style>
