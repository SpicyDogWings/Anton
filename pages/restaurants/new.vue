<script setup lang="ts">
const document = ref({
  name: "",
  direction: "",
});

const addRestaurant = async () => {
  try {
    const { createDocument, error } = useAppwriteDocuments();
    const item = {
      name: document.value.name,
      direction: document.value.direction,
    };
    await createDocument("main", "restaurants", item);
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
    <h1 class="mb-10 text-9xl font-general">Nuevo restaurante</h1>
    <v-text-field
      label="Nombre"
      variant="outlined"
      v-model="document.name"
      class="w-6/12"
    ></v-text-field>
    <v-text-field
      label="Dirección"
      variant="outlined"
      v-model="document.direction"
      class="w-6/12"
    ></v-text-field>
    <v-btn variant="outlined" class="my-4" type="submit" @click="addRestaurant">
      Añadir restaurante
    </v-btn>
  </section>
</template>
