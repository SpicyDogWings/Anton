// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },
  ssr: false,
  modules: [
    "vuetify-nuxt-module",
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "nuxt-lucide-icons",
    "nuxt-appwrite",
  ],
  appwrite: {
    endpoint: process.env.APPWRITE_ENDPOINT,
    project: process.env.APPWRITE_PROJECT,
  },
});