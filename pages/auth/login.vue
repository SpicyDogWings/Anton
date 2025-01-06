<script setup lang="ts">
const user = ref({
  email: "",
  password: "",
});

const login = async () => {
  try {
    const { loginUser, error } = useAppwriteUsers();
    await loginUser(user.value.email, user.value.password);
    if (error.value.bug) {
      throw new Error(error.value.message);
    }
    //navigateTo("/");
  } catch (e) {
    console.log(e);
  }
};
</script>

<template>
  <section class="w-full h-screen flex justify-start items-center flex-col">
    <section class="mt-20 w-10/12 flex justify-start items-start flex-col">
      <h1 class="mb-10 text-9xl font-general">Acceder</h1>
      <v-text-field
        label="Email"
        variant="outlined"
        type="email"
        v-model="user.email"
        class="w-6/12"
      ></v-text-field>
      <v-text-field
        label="Contraseña"
        variant="outlined"
        v-model="user.password"
        class="w-6/12"
        type="password"
      ></v-text-field>
      <v-btn variant="outlined" class="my-4" type="submit" @click="login()">
        Acceder
      </v-btn>
    </section>
  </section>
</template>
