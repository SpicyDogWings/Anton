<<template>
</template>

<style lang="postcss">
.v-alert {
  @apply bg-lividBrown;
  .v-alert__content {
    @apply text-ivory;
  }
}

.v-expansion-panels {
  .v-expansion-panel {
    @apply bg-ivory;
    .v-expansion-panel__shadow {
      @apply hidden;
    }
    .v-expansion-panel-title {
      @apply my-5 px-0 text-3xl;
    }
    .v-expansion-panel-text {
      .v-expansion-panel-text__wrapper {
        @apply px-0;
      }
    }
  }
}

.v-btn {
  @apply my-4 shadow-[5px_5px_0px_0px] hover:shadow-[10px_10px_0px_0px] shadow-gunMetal;
}
</style>
