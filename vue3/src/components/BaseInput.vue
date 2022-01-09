<template>
  <div><input v-model="inputText" type="text" /></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: `BaseInput`,
  emits: [`update:value`],
  props: {
    value: {
      type: String,
      required: true,
    },
  },

  computed: {
    inputText: {
      get() {
        return this.value
      },
      set(payload: string) {
        this.$emit(`update:value`, payload)
      }
    },
  }
});
</script>

<style lang="scss" scoped>

</style>