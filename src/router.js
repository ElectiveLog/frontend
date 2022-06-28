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
import jwt_decode from "jwt-decode";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/cart",
      name: "cart",
      component: Cart
    },
    {
      path: "/statistics",
      name: "statistics",
      component: Statistics
    },
    {
      path: "/styleguide",
      name: "styleguide",
      component: StyleGuide
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/register",
      name: "register",
      component: Register
    },
    {
      path: "/account",
      name: "account",
      component: Account
    },
    {
      path: "/restaurants",
      name: "restaurants",
      component: Restaurants
    },
    {
      path: "/articles",
      name: "articles",
      component: Articles
    },
    {
      path: "/:id",
      name: "place",
      component: () =>
        import(/* webpackChunkName: "place" */ "@/routes/Place.vue")
    },
    {
      path: "/:pathMatch(.*)*",
      beforeEnter: (to, from, next) => {
        next("/");
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  const publicPages = ["/login", "/register"];
  const authRequired = !publicPages.includes(to.path);

  const loggedIn = localStorage.getItem("user");

  if (authRequired && !loggedIn) {
    next("/login");
  } else {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      const infosUser = jwt_decode(user.accessToken);
      const clientPages = ["/statistics", "/restaurants", "/articles"];
      const livreurPages = ["/statistics", "/restaurants", "/articles"];
      const restaurateurPages = ["/cart"];

      if (infosUser.role == "Client" && clientPages.includes(to.path)) {
        next("/");
      } else if (
        infosUser.role == "Livreur" &&
        livreurPages.includes(to.path)
      ) {
        next("/");
      } else if (
        infosUser.role == "Restaurateur" &&
        restaurateurPages.includes(to.path)
      ) {
        next("/");
      }
    }
    next();
  }
});

export default router;
