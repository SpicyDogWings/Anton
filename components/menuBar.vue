<script setup lang="ts">
const route = useRoute();
console.log(route.path);
const items = ref([
  {
    id: 1,
    name: "Agregar restaurante",
    link: "/restaurants/new",
  },
]);
</script>
<template>
  <nav class="w-full">
    <ul class="w-full flex justify-start items-center gap-10">
      <li><a href="/" class="font-anton text-3xl">Anton</a></li>
      <li v-for="item in items" :key="item.id">
        <a
          :href="item.link"
          class="text-xl hover:cursor-pointer transition-all duration-200"
          :class="{
            'underline font-bold decoration-solid decoration-2':
              route.path === item.link,
          }"
          >{{ item.name }}</a
        >
      </li>
    </ul>
  </nav>
</template>
