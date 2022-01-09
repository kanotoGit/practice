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
/* eslint-disable */
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
  mounted() {
    this.hoge(this.object)
  },
  errorCaptured(error) {
    console.log("era-", error)
  },
  methods: {
    hoge(value: any) {
      return value.hoge.piyo
    }
  }
});
</script>
