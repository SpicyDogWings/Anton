<script setup lang="ts">
const { getDocument, documents } = useAppwriteDocuments();

const route = useRoute();
const document = ref();

onMounted(async () => {
  await getDocument("main", "restaurants", String(route.params.id));
  document.value = documents.value;
});
</script>
<template>
  <a class="mt-10 flex justify-start items-center gap-4" href="/"
    ><LucideArrowLeft class="w-6 h-6 stroke-[0.2rem]" /> Volver</a
  >
  <h1 class="mt-20 text-9xl font-general">{{ document?.name }}</h1>
</template>
