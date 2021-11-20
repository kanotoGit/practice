import Home from "@/views/Home.vue";
import Form from "@/views/form.vue";
import Confirm from "@/views/confirm.vue";
import Complete from "@/views/complete.vue";

export const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/form",
    name: "From",
    component: Form,
  },
  {
    path: "/confirm",
    name: "Confirm",
    component: Confirm,
  },
  {
    path: "/complete",
    name: "Complete",
    component: Complete,
  },
];