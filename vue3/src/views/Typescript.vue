<template>
  <div class="TypeScriptView">
    <TypeScript />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import TypeScript from '@/components/typescript/TypeScript.vue'

@Options({
  components: {
    TypeScript,
  },
})
export default class TypeScriptView extends Vue {}
</script>
