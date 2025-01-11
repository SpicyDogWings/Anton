<script setup lang="ts">
useHead({
  title: "Restaurantes",
});
</script>
<template>
  <ButtonGoBack href="/" />
  <div class="w-full flex flex-col justify-center items-start">
    <h2 class="text-7xl font-general"></h2>
    <div class="w-full flex justify-center items-start flex-col">
      <section class="w-full flex flex-col justify-start items-start">
        <h1 class="mt-20 mb-6 text-9xl font-anton underline decoration-8">
          Restaurantes
        </h1>
      </section>
      <section class="mt-10 w-full flex justify-start items-center">
        <a href="/restaurants/new">
          <v-btn
            variant="outlined"
            text="Agregar restaurante"
            class="shadow-[5px_5px_0px_0px] hover:shadow-[10px_10px_0px_0px] shadow-gunMetal"
          >
          </v-btn>
        </a>
      </section>
      <section class="w-full my-10">
        <div class="w-full flex justify-start items-center gap-5">
          <h2 class="mb-2 text-5xl">Menú</h2>
        </div>
        <v-divider :thickness="3" class="border-opacity-100"></v-divider>
      </section>
    </div>
  </div>
</template>
