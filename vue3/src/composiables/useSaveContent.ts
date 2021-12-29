import { isRef } from "vue";
import { ContentData } from "@/types";

export default function useSaveContent(data: ContentData) {

  const saveContent = () => {
    console.log(data, isRef(data))

    const params = {
      title: isRef(data.title) ? data.title.value : data.title,
      content: isRef(data.content) ? data.content.value : data.content,
    }

    localStorage.setItem("SAVE_CONTENT", JSON.stringify(params))
  }
  
  return {
    saveContent,
  }
}