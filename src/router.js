import Vue from "vue";
import Router from "vue-router";
import Home from "@/routes/Home.vue";
import Cart from "@/routes/Cart.vue";
import StyleGuide from "@/routes/StyleGuide.vue";
import Login from "@/routes/Login.vue";
import Register from "@/routes/Register.vue";
import Statistics from "@/routes/Statistics.vue";
import Restaurants from "@/routes/Restaurants.vue";
import Articles from "@/routes/Articles.vue";
import Account from "@/routes/Account.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/cart",
      name: "cart",
      component: Cart,
    },
    {
      path: "/statistics",
      name: "statistics",
      component: Statistics,
    },
    {
      path: "/styleguide",
      name: "styleguide",
      component: StyleGuide,
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/register",
      name: "register",
      component: Register,
    },
    {
      path: "/account",
      name: "account",
      component: Account,
    },
    {
      path: "/restaurants",
      name: "restaurants",
      component: Restaurants,
    },
    {
      path: "/articles",
      name: "articles",
      component: Articles,
    },
    {
      path: "/:id",
      name: "place",
      component: () =>
        import(/* webpackChunkName: "place" */ "@/routes/Place.vue"),
    },
  ],
});
