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
  <ButtonGoBack href="/" />
  <section class="w-full flex justify-center items-start flex-col">
    <h1 class="mt-20 text-9xl font-general">{{ restaurant?.name }}</h1>
    <v-btn
      @click="navigateTo('/restaurants/' + restaurant.$id + '/plates/new')"
      text="Agregar platillo"
      variant="outlined"
      class="my-20 text-4xl"
    >
    </v-btn>
    <div class="w-full my-5">
      <h2 class="mb-2 text-4xl">Platillos</h2>
      <v-divider :thickness="1" class="border-opacity-100"></v-divider>
      <ul class="my-5 w-full columns-2 gap-10">
        <li class="w-full" v-for="plate in plates" :key="plate.$id">
          <a
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
  </section>
</template>
