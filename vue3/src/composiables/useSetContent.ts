import { ref, isRef, Ref } from "vue";
import { ContentData } from "@/types";

export default function useSetContent() {

  const setContent = (title: Ref<string>, content: Ref<string>) => {
    console.log("setContent", title, content)

    const savedContent = localStorage.getItem("SAVE_CONTENT")
    if (savedContent) {
      const contentData = JSON.parse(savedContent) as ContentData
      title.value = contentData.title
      content.value = contentData.content
    }
  }
  
  return {
    setContent,
  }
}