<template>
  <div class="home">
    {{postList}}
  </div>
</template>

<script lang="ts">
import { usePostList } from "../composiables/usePostList"
import { defineComponent } from "@vue/composition-api";

export default defineComponent({
  name: "Home",

  async mounted() {
    await this.fetchPostList()
    console.log(this.postList)
  },

  setup() {
    const { postList, fetchPostList } = usePostList()

    return {
      postList,
      fetchPostList,
    }
  },
});
</script>
