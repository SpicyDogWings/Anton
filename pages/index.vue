<script setup lang="ts">
import { ID } from "appwrite";
const appwrite = useAppwriteStore();

onMounted(async () => {
  await getRestaurants();
});

const documents = ref();
const connection = ref({
  db: "",
  restaurants: "",
});
const restaurant = ref({
  name: "",
  direction: "",
});
const getRestaurants = async () => {
  try {
    connection.value.db = useDatabaseId("main");
    connection.value.restaurants = useCollectionId("restaurants");
    const response = await appwrite.db.listDocuments(
      connection.value.db,
      connection.value.restaurants,
      [],
    );
    console.log(response);
    if (response.documents.length > 0) {
      documents.value = response.documents;
    } else {
      throw new Error("No hay registros");
    }
  } catch (e) {
    console.log(e);
    documents.value = "no hay registros";
  }
};
const addRestaurant = async () => {
  await appwrite.db.createDocument(
    connection.value.db,
    connection.value.restaurants,
    ID.unique(),
    {
      name: restaurant.value.name,
      direction: restaurant.value.direction,
      score: 1,
    },
  );
  await getRestaurants();
};
</script>
<template>
  <h1 class="text-3xl font-bold">¿A donde iremos hoy?</h1>
  <ul>
    <li
      v-for="restaurant in documents"
      :key="restaurant.id"
      class="text-xl textr-slate-800 hover:text-slate-600 hover:underline"
    >
      {{ restaurant.name }}
      <span class="text-slate-400">{{ restaurant.score }}</span>
    </li>
  </ul>
  <form @submit.prevent="addRestaurant">
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
  </form>
</template>
