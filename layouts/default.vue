<script setup lang="ts">
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - Anton` : "Anton";
  },
});
</script>

<template>
  <section class="w-full h-full flex justify-start items-center flex-col bg-ivory">
    <section class="mt-20 w-10/12 flex justify-start items-start flex-col">
      <menuBar class="mb-10" />
      <slot />
    </section>
  </section>
</template>

<style lang="postcss">
@tailwind base;
@tailwind components;
@tailwind utilities;
* {
  @apply font-general text-gunMetal shadow-gunMetal border-gunMetal decoration-gunMetal;
}
</style>

<style>
@import "assets/css/anton.css";
@import "assets/css/general-sans.css";
</style
