<template>
  <div class="Composition">
    <div>タイトル：<input type="text" v-model="title"></div>
    <div>
      <textarea v-model="content" cols="100" rows="10" />
      <p>{{title}}</p>
      <p>{{content}}</p>
    </div>
    <button type="button" @click="saveContent()">保存</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, reactive, ref, toRef, toRefs } from "vue";
// composiables
import useSaveContent from "@/composiables/useSaveContent.ts"
import useSetContent from "@/composiables/useSetContent.ts"

export default defineComponent({
  name: "Composition",
  setup() {
    const title = ref("")
    const content = ref("")

    onBeforeMount(() => {
      setContent(title, content)
    })

    /**
     * データセット
     */
    const { setContent } = useSetContent()

    /**
     * データ保存
     */
    const { saveContent } = useSaveContent({ title, content })

    return {
      title,
      content,
      saveContent,
    }
  },
});
</script>

<style lang="scss" scoped>
.Composition {
  display: grid;
  place-items: center;
  gap: 20px;
}
</style>