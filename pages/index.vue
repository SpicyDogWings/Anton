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
      Query.limit(10),
    ]);
    if (error.value.bug) {
      throw new Error(error.value.message);
    }
    restaurants.value = documents.value;
  } catch (e) {
    console.log(e);
    restaurants.value = "no hay registros";
  }
};
</script>
<template>
  <div class="w-full flex flex-col justify-center items-start">
    <h2 class="text-7xl font-general"></h2>
    <div class="w-full flex justify-center items-start flex-col">
      <section class="w-full flex flex-col justify-start items-start">
        <h1 class="mt-20 mb-6 text-9xl font-anton underline decoration-8">
          Carta de la casa
        </h1>
        <div class="flex justify-start items-start gap-20">
          <p class="basis-80 text-xl">
            Es momento de escojer uno de nuestros preferidos
          </p>
          <p class="basis-80 text-lg">Todo tu menú en un solo lugar</p>
        </div>
      </section>
      <section class="w-full my-10">
        <div class="w-full flex justify-start items-center gap-5">
          <h2 class="mb-2 font-bold text-5xl">Agregados recientemente</h2>
        </div>
        <v-divider :thickness="3" class="border-opacity-100"></v-divider>
        <div class="mt-5">
          <h3 class="mb-2 font-bold text-3xl">Restaurantes</h3>
          <v-divider :thickness="1" class="border-opacity-100"></v-divider>
        </div>
      </section>
      <ul
        class="w-full columns-2 gap-10"
      >
        <li
          class="w-full"
          v-for="restaurant in restaurants"
          :key="restaurant.$id"
        >
          <a
            class="w-full flex justify-between items-center gap-5 hover:gap-10 hover:cursor-pointer  transition-all diration-200 ease-out"
            @click="navigateTo('/restaurants/' + restaurant.$id)"
          >
            <span class="hover:pl-2 basis-fit text-nowrap font-bold text-xl transition-all duration-200 ease-out">{{
              restaurant.name
            }}</span>
            <hr class="basis-full border-2 border-dotted"></hr>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>
