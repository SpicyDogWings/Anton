<script setup lang="ts">
import { Query } from "appwrite";
const route = useRoute();
const restaurant = ref();
const plates = ref();

onMounted(async () => {
  const { getDocument, listDocuments, documents } = useAppwriteDocuments();
  await getDocument("main", "restaurants", String(route.params.id));
  restaurant.value = documents.value;
  await listDocuments("main", "plates", [
    Query.equal("restaurant", String(route.params.id)),
  ]);
  plates.value = documents.value;
});
</script>
<template>
  <a class="mt-10 flex justify-start items-center gap-4" href="/"
    ><LucideArrowLeft class="w-6 h-6 stroke-[0.2rem]" /> Volver</a
  >
  <section class="w-full flex justify-center items-start flex-col">
    <h1 class="mt-20 text-9xl font-general">{{ restaurant?.name }}</h1>
    <v-btn
      @click="navigateTo('/restaurants/' + restaurant.$id + '/plates/new')"
      text="Agregar platillo"
      variant="outlined"
      class="mt-20 text-4xl"
    >
    </v-btn>
    <h2 class="mt-20 text-4xl font-general">Platillos</h2>
    <ul class="mt-5 w-full flex flex-wrap justify-start items-center gap-10">
      <li v-for="plate in plates" :key="plate.$id">
        <v-card>
          <v-card-title>{{ plate.name }}</v-card-title>
          <v-card-subtitle>{{ plate.description }}</v-card-subtitle>
          <template v-slot:actions>
            <v-btn
              text="Ver"
              @click="
                navigateTo(
                  '/restaurants/' + restaurant.$id + '/plates/' + plate.$id,
                )
              "
            ></v-btn>
          </template>
        </v-card>
      </li>
    </ul>
  </section>
</template>
