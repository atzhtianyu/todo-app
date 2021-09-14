import Vue from "vue";
import VueRouter from "vue-router";

const Home = () => import("../views/home/Home.vue");
const Detail = () => import("../views/detail/Detail.vue");
const Editing = () => import("../views/editing/Editing.vue");

Vue.use(VueRouter);

const routes = [
  {
    path: "",
    redirect: "/home",
  },
  {
    path: "/home",
    component: Home,
  },
  {
    path: "/detail",
    component: Detail,
  },
  {
    path: "/editing",
    component: Editing,
  },
];

const router = new VueRouter({
  routes,
  mode: "history",
});

export default router;
