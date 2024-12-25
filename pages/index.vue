<script setup lang="ts">
import { ID, Query } from "appwrite";
//import * as LucideIcons from "lucide-vue-next";

onMounted(async () => {
  await getRestaurants();
});

const restaurants = ref();
//const restaurant = ref({
//  name: "",
//  direction: "",
//});
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

//const addRestaurant = async () => {
//  await appwrite.db.createDocument(
//    connection.value.db,
//    connection.value.restaurants,
//    ID.unique(),
//    {
//      name: restaurant.value.name,
//      direction: restaurant.value.direction,
//      score: 1,
//    },
//  );
//  await getRestaurants();
//};

//const getIcon = (iconName: string) => {
//  return LucideIcons[iconName] || null;
//};
const getUrl = (id: string) => {
  return `/restaurants/${id}`;
};
</script>
<template>
  <h1 class="text-9xl font-general">A la carta</h1>
  <section class="w-full flex justify-center items-start flex-col">
    <h1 class="mt-20 text-4xl">Agregados recientemente</h1>
    <h2 class="mt-20 text-4xl">Restaurantes</h2>
    <ul class="mt-5 w-full flex flex-wrap justify-start items-center gap-10">
      <li v-for="restaurant in restaurants" :key="restaurant.$id">
        <v-card>
          <v-card-title>{{ restaurant.name }}</v-card-title>
          <v-card-subtitle>{{ restaurant.direction }}</v-card-subtitle>
          <template v-slot:actions>
            <v-btn
              text="Editar"
              @click="navigateTo('restaurants/' + restaurant.$id)"
            ></v-btn>
          </template>
        </v-card>
        <!-- <a
          class="w-fit h-fit flex flex-wrap justify-center items-center"
          :href="getUrl(restaurant.$id)"
        >
          <div
            class="py-8 px-8 flex justify-center items-center flex-grow border-r-[0.3rem]"
            :style="{ 'background-color': '#' + restaurant.color }"
          >
            <component
              :is="getIcon(restaurant.icon)"
              class="text-white w-14 h-14"
            />
          </div>
          <div
            class="px-10 flex justify-center items-center flex-grow-[3] text-2xl"
          >
            <p class="text-gunMetal font-bold">
              {{ restaurant.name }}
            </p>
          </div>
        </a> -->
      </li>
    </ul>
  </section>
  <!-- <form @submit.prevent="addRestaurant">
    <v-btn variant="outlined" class="my-4" type="submit">
      Añadir restaurante
    </v-btn>
    <v-text-field
      label="Nombre del restaurante"
      variant="outlined"
      v-model="restaurant.name"
    ></v-text-field>
    <v-text-field
      label="Dirección"
      variant="outlined"
      v-model="restaurant.direction"
    ></v-text-field>
  </form> -->
</template>
