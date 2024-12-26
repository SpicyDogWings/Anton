<script setup lang="ts">
import { Query } from "appwrite";

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
  <h1 class="text-9xl font-general">A la carta</h1>
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
              @click="navigateTo('restaurants/' + restaurant.$id)"
            ></v-btn>
          </template>
        </v-card>
      </li>
    </ul>
  </section>
</template>
