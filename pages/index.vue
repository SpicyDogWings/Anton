<script setup lang="ts">
import { ID } from "appwrite";
import * as LucideIcons from "lucide-vue-next";
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

const generateBg = (color: string) => {
  const bg = `#${color}`;
  return bg;
};

const getIconComponent = (iconName: string) => {
  return LucideIcons[iconName] || null;
};
</script>
<template>
  <h1 class="text-9xl font-anton">Menú</h1>
  <section class="w-full flex justify-center items-start flex-col">
    <h1 class="mt-20 text-4xl font-bold">Recientemente agregados</h1>
    <ul class="mt-5 w-full flex flex-wrap justify-start items-center gap-10">
      <li v-for="restaurant in documents" :key="restaurant.id">
        <a
          class="w-fit h-fit flex flex-wrap justify-center items-center bg-whiteSmoke border-[0.3rem] rounded-xl overflow-hidden shadow-[18px_15px_0px_0px_#1a202c]"
          href="#"
        >
          <div
            class="py-8 px-8 flex justify-center items-center flex-grow border-r-[0.3rem]"
            :style="{ 'background-color': '#' + restaurant.color }"
          >
            <component
              :is="getIconComponent(restaurant.icon)"
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
        </a>
      </li>
    </ul>
  </section>
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
