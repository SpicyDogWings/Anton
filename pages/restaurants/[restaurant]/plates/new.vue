<script setup lang="ts">
const appwrite = useAppwriteStore();
const route = useRoute();
const restaurant = ref({
  name: "",
  direction: "",
});
const alert = ref({
  message: "",
  show: false,
});
const document = ref<Plates>({});
const validForm = ref(false);

onMounted(async () => {
  const { getDocument, documents } = useAppwriteDocuments();
  await getDocument("main", "restaurants", String(route.params.restaurant));
  restaurant.value = documents.value;
  document.value.restaurant = restaurant.value.$id
});

const rules = ref({
  required: value => !!value || "Este campo es requerido",
  score: value => {
    return (value >= 1 && value <= 5) || "El rango es de 1-5"
  } 
})

const addPlate = async () => {
  try {
    document.value.price = parseFloat(document.value.price);
    document.value.score = parseInt(document.value.score);
    const fetchedUser = await appwrite.getUser();
    document.value.user = fetchedUser.$id; 
    console.log(document.value)
    if (['name', 'description', 'user'].some(key => !document.value[key])) {
      throw new Error("Se requiere completar los campos obligatorios");
    } else if (document.value.score < 1 || document.value.score > 5) {
      throw new Error("El rango del campo Puntuación es de 1-5");
    }
    const { createDocument, documents, error } = useAppwriteDocuments();
    await createDocument("main", "plates", document.value);
    navigateTo("/");
  } catch (e) {
    alert.value.message = e.message
    if (alert.value.show = true) alert.value.show = false
    alert.value.show = true;
    setTimeout(() => {
      alert.value.show = false;
    }, 5000);
  }
};
</script>

<template>
  <v-scroll-x-transition>
    <v-alert
      v-if="alert.show"
      :text="alert.message"
      class="fixed right-5"
    ></v-alert>
  </v-scroll-x-transition>
  <ButtonGoBack :href="'/restaurants/' + restaurant.$id" />
  <section class="w-full flex justify-center items-start flex-col">
    <section class="my-20 w-full flex flex-col justify-start items-start">
      <h1 class="mb-6 text-9xl font-anton underline decoration-8">
        Nuevo Platillo
      </h1>
      <div class="mt-10 flex justify-start items-start gap-20">
        <h2 class="text-5xl font-general">{{ restaurant?.name }}</h2>
      </div>
    </section>
    <section class="w-full flex flex-wrap flex-col">
      <h2 class="text-3xl">Datos del platillo</h2>
      <v-form v-model="validForm" @submit.prevent="addPlate" >
        <div class="my-5 w-full flex flex-wrap gap-10">
          <v-text-field
            label="Nombre del platillo"
            :rules="[rules.required]"
            variant="outlined"
            v-model="document.name"
            class="basis-5/12"
          ></v-text-field>
          <v-text-field
            label="Descripción del platillo"
            :rules="[rules.required]"
            variant="outlined"
            v-model="document.description"
            class="basis-5/12"
          ></v-text-field>
        </div>
        <div class="w-full flex flex-wrap gap-10">
          <v-text-field
            label="Precio del platillo"
            hint="Precio en córdobas"
            :rules="[rules.required]"
            variant="outlined"
            v-model="document.price"
            type="number"
            class="basis-6/12 max-w-sm"
          ></v-text-field>
          <v-text-field
            label="Puntiación del platillo"
            hint="Puntuación del 1 al 5"
            :rules="[rules.required, rules.score]"
            variant="outlined"
            type="number"
            v-model="document.score"
            class="basis-6/12 max-w-sm"
          ></v-text-field>
        </div>
        <div class="w-full flex justify-end"> 
          <v-btn
            variant="outlined"
            type="submit"
          >
            Añadir platillo
          </v-btn>
        </div> 
      </ v-form>
    </section>
   </section>
</template>
