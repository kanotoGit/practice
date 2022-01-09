import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";


const app = createApp(App)

app.config.errorHandler = function (e, vm, info) {
  console.log("aaa", e)
  console.log("bbb", vm)
  console.log("ccc", info)
}

app.use(store).use(router).mount("#app")
