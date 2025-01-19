<script setup lang="ts">
import { Query } from "appwrite";

const route = useRoute();
const restaurant = ref();
const plates = ref();

onMounted(async () => {
  try {
    const { getDocument, listDocuments, documents } = useAppwriteDocuments();
    await getDocument("main", "restaurants", String(route.params.id));
    restaurant.value = documents.value;
    useHead({
      title: restaurant.value.name,
    });
    await listDocuments("main", "plates", [
      Query.equal("restaurant", String(route.params.id)),
    ]);
    plates.value = documents.value;
  } catch (e) {
    console.log(e);
    restaurants.value = "no hay registros";
  }
});
</script>
<template>
  <section class="w-full flex justify-between items-center">
    <ButtonGoBack href="/" />
    <a :href="'/restaurants/edit/' + restaurant?.$id">Editar</a>
  </section>
  <section class="w-full flex justify-center items-start flex-col">
    <h1 class="mt-20 text-9xl font-general">{{ restaurant?.name }}</h1>
    <p class="mt-5 text-4xl">{{ restaurant?.description }}</p>
    <a :href="'/restaurants/' + restaurant?.$id + '/plates/new/'" >
      <v-btn
        text="Agregar platillo"
        variant="outlined"
        class="my-20"
      >
      </v-btn>
    </a>
    <div class="w-full my-5">
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
            v-for="plate in plates"
            :key="plate.$id"
          >
            <a
              :href="'/restaurants/' + restaurant?.$id + '/plates/' + plate.$id"
              class="w-full flex justify-between items-center gap-5 hover:gap-10 hover:cursor-pointer transition-all diration-200 ease-out"
            >
              <span
                class="hover:pl-2 basis-fit text-nowrap font-bold text-xl transition-all duration-200 ease-out"
                >{{ plate.name }}</span
              >
              <hr class="basis-full border-2 border-dotted" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
