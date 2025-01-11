<script setup lang="ts">
useHead({
  title: "Nuevo Restaurante",
});

const document = ref({
  name: "",
  description: "",
  direction: "",
  departamento: "",
  lugar: "",
});
const alert = ref({
  message: "",
  show: false,
});

const rules = ref({
  required: value => !!value || "Este campo es requerido"
})

const addRestaurant = async () => {
  try {
    const { createDocument, error } = useAppwriteDocuments();
    const item = {
      name: document.value.name,
      direction: document.value.description,
    };
    if (!item.name && !item.direction) {
      throw new Error("Se requiere completar los campos obligatorios");
    } 
    await createDocument("main", "restaurants", item);
    if (error.value.bug) {
      throw new Error(error.value.message);
    }
    navigateTo("/");
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      alert.value.message = error.message;
      alert.value.show = true;
      setTimeout(() => {
        alert.value.show = false;
      }, 5000);
    } else {
      console.error("An unexpected error occurred:", error);
    }
  }
};
</script>

<template>
  <v-alert
    v-if="alert.show"
    :text="alert.message"
    class="fixed right-5"
  ></v-alert>
  <ButtonGoBack href="/restaurants" />
  <section class="w-full flex justify-center items-start flex-col">
    <section class="my-20 w-full flex flex-col justify-start items-start">
      <h1 class="mb-6 text-9xl font-anton underline decoration-8">
        Nuevo restaurante
      </h1>
      <div class="flex justify-start items-start gap-20">
        <p class="basis-80 text-xl">
          Agregar un nuevo restaurante a las reseñas
        </p>
      </div>
    </section>
    <section class="my-5 w-full flex flex-col">
      <h2 class="mb-5 text-3xl">Datos del restaurante</h2>
      <div class="w-full flex gap-10">
        <v-text-field
          label="Nombre del restaurante"
          variant="outlined"
          v-model="document.name"
          :rules="[rules.required]"
          class="w-6/12"
        ></v-text-field>
        <v-text-field
          label="Descripción del restaurante"
          variant="outlined"
          v-model="document.description"
          :rules="[rules.required]"
          class="w-6/12"
        ></v-text-field>
      </div>
    </section>
    <section class="my-5 w-full flex flex-col">
      <h2 class="mb-5 text-3xl">Ubicación</h2>
      <div class="w-full flex gap-10">
        <v-text-field
          label="Departamento"
          variant="outlined"
          v-model="document.name"
          class="w-6/12"
        ></v-text-field>
        <v-text-field
          label="Lugar"
          variant="outlined"
          hint="Puede ser un lugar más específico"
          placeholder="Poneloya"
          v-model="document.direction"
          class="w-6/12"
        ></v-text-field>
      </div>
      <div class="my-5 w-full flex gap-10">
        <v-text-field
          label="Dirección"
          variant="outlined"
          hint="Describe como se puede llegar al lugar"
          v-model="document.direction"
          class="w-6/12"
        ></v-text-field>
      </div>
    </section>
    <div class="w-full flex justify-end"> 
      <v-btn
        variant="outlined"
        class="my-4 shadow-[5px_5px_0px_0px] hover:shadow-[10px_10px_0px_0px] shadow-gunMetal"
        type="submit"
        @click="addRestaurant"
      >
        Añadir restaurante
      </v-btn>
    </div> 
  </section>
</template>
