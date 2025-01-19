<script setup lang="ts">
import { Query } from "appwrite";
const route = useRoute();
const plate = ref();
const details = ref({
  restaurant: ""
});

onMounted(async () => {
  const { getDocument, listDocuments, documents } = useAppwriteDocuments();
  await getDocument("main", "plates", String(route.params.id));
  plate.value = documents.value;
  useHead({
    title: plate.value.name,
  });
  await getDocument("main", "restaurants", String(route.params.restaurant))
  details.value.restaurant = documents.value.name
});
</script>
<template>
  <ButtonGoBack href="/" />
  <section class="w-full flex justify-between items-start">
    <div class="basis-7/12 flex flex-col items-start justify-start">
      <h1 class="mt-20 text-9xl font-general">{{ plate?.name }}</h1>
      <p class="mt-5 basis-80 text-4xl">
        {{ plate?.description }}
      </p>
    </div>
    <div class="basis-3/12">
      <h1 class="text-5xl font-general">Detalles</h1>
      <ul class="mt-10 w-full">
        <li class="w-full flex justify-between items-center">
          <span>Restaurante</span>
          <span class="font-bold">{{ details?.restaurant }}</span>
        </li>
        <v-divider :thickness="1" class="border-opacity-50"></v-divider>
        <li class="w-full flex justify-between items-center">
          <span>Precio</span>
          <span class="font-bold">{{ plate?.price }}</span>
        </li>
        <v-divider :thickness="1" class="border-opacity-50"></v-divider>
        <li class="w-full flex justify-between items-center">
          <span>Puntuación</span>
          <span class="font-bold">{{ plate?.score }}</span>
        </li>
        <v-divider :thickness="1" class="border-opacity-50"></v-divider>
      </ul>
    </div>
  </section>
</template>
