<script setup lang="ts">
const appwrite = useAppwriteStore();
const route = useRoute();

const document = ref<Restaurants>({});
const alert = ref({
  message: "",
  show: false,
});

onMounted(async () => {
  const { getDocument, documents } = useAppwriteDocuments();
  await getDocument("main", "restaurants", String(route.params.id));
  document.value = documents.value;
  useHead({
    title: `Editar ${document.value.name}`,
  });
})

const rules = ref({
  required: value => !!value || "Este campo es requerido"
})

const putRestaurant = async () => {
  try {
    const { putDocument } = useAppwriteDocuments();
    const fetchedUser = await appwrite.getUser();
    document.value.user = fetchedUser.$id; 
    if (!document.value.name || !document.value.description || !document.value.user) {
      throw new Error("Se requiere completar los campos obligatorios");
    } 
    await createDocument("main", "restaurants", document.value);
    navigateTo("/");
  } catch (e) {
    alert.value.message = e.message
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
  <ButtonGoBack href="/restaurants" />
  <section class="w-full flex justify-center items-start flex-col">
    <section class="my-20 w-full flex flex-col justify-start items-start">
      <p class="text-3xl font-anton">
        Editar
      </p>
      <h1 class="mb-6 text-9xl decoration-8">
        {{ document.name }}
      </h1>
    </section>
    <section class="my-5 w-full flex flex-col">
      <h2 class="mb-5 text-3xl">Datos del restaurante</h2>
      <div class="w-full flex gap-10">
        <v-text-field
          label="Nombre del restaurante"
          variant="outlined"
          v-model="document.name"
          :rules="[rules.required]"
          class="basis-5/12"
        ></v-text-field>
        <v-text-field
          label="Descripción del restaurante"
          variant="outlined"
          v-model="document.description"
          :rules="[rules.required]"
          class="basis-5/12"
        ></v-text-field>
      </div>
    </section>
    <section class="my-5 w-full flex flex-col">
      <v-expansion-panels>
        <v-expansion-panel>
          <v-expansion-panel-title>
            <h2 class="mb-5 text-3xl">Ubicación</h2>
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <div class="w-full flex gap-10">
              <v-autocomplete
                label="Departamento"
                :items="['León', 'Managua', 'Estelí']"
                v-model="document.departamento"
                variant="outlined"
                class="basis-6/12"
              ></v-autocomplete>
              <v-text-field
                label="Lugar"
                variant="outlined"
                hint="Puede ser un lugar más específico"
                placeholder="Poneloya"
                v-model="document.lugar"
                class="basis-6/12"
              ></v-text-field>
            </div>
            <div class="my-5 w-full flex gap-10">
              <v-text-field
                label="Dirección"
                variant="outlined"
                hint="Describe como se puede llegar al lugar"
                v-model="document.direction"
                class="basis-full"
              ></v-text-field>
            </div>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
      <v-divider>
      </v-divider>
    </section>
    <div class="w-full flex justify-end"> 
      <v-btn
        variant="outlined"
        type="submit"
        @click="addRestaurant"
      >
        Añadir restaurante
      </v-btn>
    </div> 
  </section>
</template>
