import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/routes/Home.vue";
import Cart from "@/routes/Cart.vue";
import StyleGuide from "@/routes/StyleGuide.vue";
import Login from "@/routes/Login.vue";
import Register from "@/routes/Register.vue";
import Statistics from "@/routes/Statistics.vue";
import Restaurants from "@/routes/Restaurants.vue";
import Articles from "@/routes/Articles.vue";
import Account from "@/routes/Account.vue";
import ListOfArticles from "@/routes/ListOfArticles.vue";
import MyRestaurant from "@/routes/MyRestaurant.vue";
// import jwt_decode from "jwt-decode";

Vue.use(VueRouter);

const router = new VueRouter({
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
      path: "/myrestaurant",
      name: "myrestaurant",
      component: MyRestaurant,
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
      path: "/listofarticles/:id",
      name: "listofarticles",
      component: ListOfArticles,
      props: true,
    },
    {
      path: "/:id",
      name: "place",
      component: () =>
        import(/* webpackChunkName: "place" */ "@/routes/Place.vue"),
    },
  ],
});

// router.beforeEach((to, from, next) => {
//   const publicPages = ["/login", "/register"];
//   // const clientPages = ["/statistics"];
//   // const authRequiredClient = !clientPages.includes(to.path);
//   const authRequired = !publicPages.includes(to.path);
//   const loggedIn = localStorage.getItem("user");
//   // const user = JSON.parse(localStorage.getItem("user"));
//   // const infosUser = jwt_decode(user.accessToken);

//   // trying to access a restricted page + not logged in
//   // redirect to login page

//   if (authRequired && !loggedIn) {
//     next("/login");
//   } else {
//     // if (authRequired && loggedIn) {
//     //   next("/");
//     // }
//     // if (authRequiredClient && infosUser.role == "client") {
//     //   next("/");
//     // }

//     // infosUser.role === ""

//     next();
//   }
// });

export default router;
