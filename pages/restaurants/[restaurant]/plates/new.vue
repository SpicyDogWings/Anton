<script setup lang="ts">
const route = useRoute();
const restaurant = ref({
  name: "",
  direction: "",
});
const document = ref({
  name: "",
  description: "",
});

onMounted(async () => {
  const { getDocument, documents } = useAppwriteDocuments();
  await getDocument("main", "restaurants", String(route.params.restaurant));
  restaurant.value = documents.value;
});

const addRestaurant = async () => {
  try {
    const { createDocument, documents, error } = useAppwriteDocuments();
    const item = {
      name: document.value.name,
      description: document.value.description,
      restaurant: route.params.restaurant,
    };
    await createDocument("main", "plates", item);
    if (error.value.bug) {
      throw new Error(error.value.message);
    }
    navigateTo("/");
  } catch (e) {
    console.log(e);
  }
};
</script>

<template>
  <a class="mt-10 flex justify-start items-center gap-4" href="/"
    ><LucideArrowLeft class="w-6 h-6 stroke-[0.2rem]" /> Volver</a
  >
  <section class="w-full flex justify-center items-start flex-col">
    <h1 class="my-10 text-9xl font-general">Nuevo Platillo</h1>
    <h2 class="mb-10 text-5xl font-general">{{ restaurant?.name }}</h2>
    <v-text-field
      label="Nombre"
      variant="outlined"
      class="w-6/12"
      v-model="document.name"
    ></v-text-field>
    <v-text-field
      label="Descripción"
      variant="outlined"
      class="w-6/12"
      v-model="document.description"
    ></v-text-field>
    <v-btn
      variant="outlined"
      class="my-4"
      type="submit"
      @click="addRestaurant()"
    >
      Añadir restaurante
    </v-btn>
  </section>
</template>
