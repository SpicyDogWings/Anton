<script setup lang="ts">
import { Query } from "appwrite";

useHead({
  title: "Entrada",
});

onMounted(async () => {
  await getRestaurants();
});

const restaurants = ref();
const getRestaurants = async () => {
  try {
    const { listDocuments, documents, error } = useAppwriteDocuments();
    await listDocuments("main", "restaurants", [
      Query.orderDesc("$createdAt"),
      Query.limit(5),
    ]);
    if (error.value.bug) {
      throw new Error(error.value.message);
    }
    console.log(documents.value);
    restaurants.value = documents.value;
  } catch (e) {
    console.log(e);
    restaurants.value = "no hay registros";
  }
};
</script>
<template>
  <section class="w-full flex justify-start items-end gap-10">
    <h1 class="text-9xl font-anton text-carbonBlack">A la carta</h1>
    <div class="flex flex-col jusify-end items-start">
      <span
        class="py-2 px-6 text-xl font-general text-carbonBlack bg-whiteSmoke border-carbonBlack border-2 rounded-lg shadow-[10px_10px_0px_0px_#1a202c] -translate-y-4 hover:-translate-y-5 hover:-translate-x-1 transition-all duration-200 hover:shadow-[20px_20px_0px_0px_#1a202c]"
        >Todo tu menú en un solo lugar</span
      >
    </div>
  </section>
  <h2 class="text-7xl font-general"></h2>
  <section class="w-full flex justify-center items-start flex-col">
    <v-btn
      @click="navigateTo('/restaurants/new')"
      text="Agregar restaurante"
      variant="outlined"
      class="mt-20 text-4xl"
    >
    </v-btn>
    <h1 class="mt-20 text-4xl">Agregados recientemente</h1>
    <h2 class="mt-20 text-4xl">Restaurantes</h2>
    <ul class="mt-5 w-full flex flex-wrap justify-start items-center gap-10">
      <li v-for="restaurant in restaurants" :key="restaurant.$id">
        <v-card>
          <v-card-title>{{ restaurant.name }}</v-card-title>
          <v-card-subtitle>{{ restaurant.direction }}</v-card-subtitle>
          <template v-slot:actions>
            <v-btn
              text="Ver"
              @click="navigateTo('/restaurants/' + restaurant.$id)"
            ></v-btn>
          </template>
        </v-card>
      </li>
    </ul>
  </section>
</template>
