<script setup lang="ts">
import { Query } from "appwrite";
const route = useRoute();
const plates = ref();

onMounted(async () => {
  const { getDocument, listDocuments, documents } = useAppwriteDocuments();
  await getDocument("main", "plates", String(route.params.id));
  plates.value = documents.value;
});
</script>
<template>
  <a class="mt-10 flex justify-start items-center gap-4" href="/"
    ><LucideArrowLeft class="w-6 h-6 stroke-[0.2rem]" /> Volver</a
  >
  <section class="w-full flex justify-center items-start flex-col">
    <h1 class="mt-20 text-9xl font-bold">{{ plates?.name }}</h1>
    <p class="mt-5 basis-80 text-4xl">
      {{ plates?.description }}
    </p>
  </section>
</template>
