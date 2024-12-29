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
  <div class="w-full flex flex-col justify-center items-start">
    <!-- <section class="w-full flex justify-start items-end gap-10">
      <h1 class="text-9xl font-anton">Carta</h1>
      <span
        class="py-2 px-6 text-xl font-general bg-ivory border-2 rounded-lg shadow-[10px_10px_0px_0px_#1a202c] -translate-y-4 hover:-translate-y-5 hover:-translate-x-1 transition-all duration-200 hover:shadow-[20px_20px_0px_0px] shadow-gunMetal"
        >Todo tu menú en un solo lugar</span
      >
    </section> -->
    <h2 class="text-7xl font-general"></h2>
    <div class="w-full flex justify-center items-start flex-col">
      <section class="w-full flex flex-col justify-start items-start">
        <h1 class="mt-20 mb-6 text-9xl font-anton underline decoration-8">
          Carta de la casa
        </h1>
        <div class="flex justify-start items-start gap-20">
          <p class="basis-80 text-lg">
            Es momento de escojer uno de nuestros preferidos, ¿O será uno nuevo
            esta vez?
          </p>
          <p class="basis-80 text-lg">Todo tu menú en un solo lugar</p>
        </div>
      </section>
      <section class="w-full my-10">
        <div class="w-full flex justify-start items-center gap-5">
          <LucideClock class="w-10 h-10 stroke-[0.15rem]" />
          <h2 class="mb-2 text-5xl">Agregados recientemente</h2>
        </div>
        <v-divider :thickness="3" class="border-opacity-100"></v-divider>
        <div>
          <h3 class="text-3xl">Restaurantes</h3>
          <v-divider :thickness="1" class="border-opacity-100"></v-divider>
        </div>
      </section>
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
    </div>
  </div>
</template>
