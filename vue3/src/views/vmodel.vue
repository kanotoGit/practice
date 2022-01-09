<template>
  <div>
    <base-input v-model:value="inputText" />
    <p>{{inputText}}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
// component
import BaseInput from "@/components/BaseInput.vue"

export default defineComponent({
  name: 'vmodel',
  components: {
    BaseInput,
  },

  data() {
    return {
      inputText: "",
    }
  }
});
</script>

<style lang="scss" scoped>

</style>