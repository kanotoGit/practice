import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import Composition from "../views/Composition.vue";
import vmodel from "../views/vmodel.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/composition",
    name: "Composition",
    component: Composition,
  },
  {
    path: "/vmodel",
    name: "vmodel",
    component: vmodel,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
