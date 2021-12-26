import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "@/views/Home.vue";
import TypeScript from "@/components/typescript/TypeScript.vue";
import TypeScript2 from "@/components/typescript/TypeScript2.vue";
import TypeScript3 from "@/components/typescript/TypeScript3.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/typescript",
    name: "TypeScript",
    component: TypeScript,
  },
  {
    path: "/typescript2",
    name: "TypeScript2",
    component: TypeScript2,
  },
  {
    path: "/typescript3",
    name: "TypeScript3",
    component: TypeScript3,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
