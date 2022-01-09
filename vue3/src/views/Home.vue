<template>
  <div class="home">
    <h1>出力：</h1>
    <ul>
      <li>{{nullish ?? "NULLだよ"}}</li>
      <li>{{falsy || "falseだよ"}}</li>
      <li>{{object?.hoge ?? "オプショナルチェイニング"}}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Home",
  data() {
    return {
      nullish: null,
      falsy: 0,
      object: {},
    }
  },
});
</script>
