<script setup lang="ts">
const appwrite = useAppwriteStore();
const route = useRoute();

onMounted(async () => {
  await getRestaurants();
});

const document = ref();
const connection = ref({
  db: "",
  restaurants: "",
  document: "",
});
const restaurant = ref({
  name: "",
  direction: "",
});

const getRestaurants = async () => {
  try {
    connection.value.db = useAppwriteDatabase("main");
    connection.value.restaurants = useAppwriteCollection("restaurants");
    connection.value.document = String(route.params.id);
    const response = await appwrite.db.getDocument(
      connection.value.db,
      connection.value.restaurants,
      connection.value.document,
      [],
    );
    if (response) {
      document.value = response;
    } else {
      throw new Error("No hay registros");
    }
  } catch (e) {
    console.log(e);
    document.value = "no hay registros";
  }
};
</script>
<template>
  <a
    class="mt-10 flex justify-start items-center gap-4 hover:gap-8 text-gunMetal text-3xl font-bold ease-out transition-all duration-300"
    href="/"
    ><LucideArrowLeft class="w-10 h-10 stroke-[0.2rem]" /> Volver</a
  >
  <h1 class="mt-20 text-9xl font-anton">{{ document?.name }}</h1>
</template>
