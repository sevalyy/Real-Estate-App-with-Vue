import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import NewHouseView from "../views/NewHouseView";
import HouseDetailsView from "../views/HouseDetailsView";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/newhouse",
    name: "newhouse",
    component: NewHouseView,
  },
  {
    path: "/housedetails/:id",
    name: "housedetails",
    component: HouseDetailsView,
    props: true,
  },
  {
    path: "/edit/:id",
    name: "edit",
    component: NewHouseView,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
