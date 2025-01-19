<script setup lang="ts">
import { Query } from "appwrite";

useHead({
  title: "Restaurantes",
});

onMounted(async () => {
  await getRestaurants();
});

const restaurants = ref<restaurants>();

const getRestaurants = async () => {
  try {
    const { listDocuments, documents } = useAppwriteDocuments();
    await listDocuments("main", "restaurants", [
      Query.orderDesc("$createdAt"),
      Query.limit(10),
      []
    ]);
    restaurants.value = documents.value;
  } catch (e) {
    console.log(e);
    restaurants.value = "no hay registros";
  }
};
</script>
<template>
  <ButtonGoBack href="/" />
  <div class="w-full flex flex-col justify-center items-start">
    <h2 class="text-7xl font-general"></h2>
    <div class="w-full flex justify-center items-start flex-col">
      <section class="w-full flex flex-col justify-start items-start">
        <h1 class="mt-20 mb-6 text-9xl font-anton underline decoration-8">
          Restaurantes
        </h1>
      </section>
      <section class="mt-10 w-full flex justify-start items-center">
        <a href="/restaurants/new">
          <v-btn
            variant="outlined"
            text="Agregar restaurante"
          >
          </v-btn>
        </a>
      </section>
      <section class="w-full my-10">
        <div class="w-full flex justify-start items-center gap-5">
          <h2 class="mb-2 text-5xl">Menú</h2>
        </div>
        <v-divider :thickness="3" class="border-opacity-100"></v-divider>
        <div class="my-5">
          <h3 class="mb-2 text-3xl">Recien agregados</h3>
          <v-divider :thickness="1" class="border-opacity-100"></v-divider>
          <ul class="my-5 w-full columns-2 gap-10">
            <li
              class="w-full"
              v-for="restaurant in restaurants"
              :key="restaurant.$id"
            >
              <a
                :href="'/restaurants/' + restaurant.$id"
                class="w-full flex justify-between items-center gap-5 hover:gap-10 hover:cursor-pointer transition-all diration-200 ease-out"
              >
                <span
                  class="hover:pl-2 basis-fit text-nowrap font-bold text-xl transition-all duration-200 ease-out"
                  >{{ restaurant.name }}</span
                >
                <hr class="basis-full border-2 border-dotted" />
              </a>
            </li>
          </ul>
        </div>
      </section>
    </div>
  </div>
</template>
