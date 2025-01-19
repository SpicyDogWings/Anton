<script setup lang="ts">
const props = defineProps(["href"]);
</script>

<template>
  <a
    class="mt-10 flex justify-start items-center gap-4 hover:gap-6 transition-all duration-150 ease-out"
    :href="props.href"
    ><LucideArrowLeft class="w-6 h-6 stroke-[0.2rem]" />Volver</a
  >
</template>
