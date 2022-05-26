import { ref, Ref } from "@vue/composition-api";

export function usePostList(): { postList: Ref<any[]>, fetchPostList: () => Promise<void> } {
  const postList = ref<any[]>([]);

  async function fetchPostList(): Promise<void> {
    try {
      const response = await fetch(`http://api.querynote.net/wp-json/wp/v2/posts/`)
        .then(res => res.json())
      postList.value = response
    } catch (error) {
      console.error(error)
    }
  }

 return { postList, fetchPostList };
}