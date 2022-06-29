<template>
  <div class="row">
    <div>
      <h5 class="space_bottom">
        Articles dans le panier : {{ Object.keys(this.cart).length }}
      </h5>
      <h5 class="space_bottom">Montant : {{ this.totalPrice }} €</h5>
      <button
        @click="createOrder()"
        class="blue_button styled_button space_bottom"
      >
        Valider
      </button>
      &nbsp;
      <button
        @click="emptyCart()"
        class="red_button styled_button space_bottom"
      >
        Vider le panier
      </button>
      <h5 class="space_bottom">{{ validation }}</h5>
    </div>
    <div
      id="mouseover"
      class="col-md-4 effect"
      v-for="(articles, index) in articles"
      :key="index"
      @click="addArticleToCart(articles, index)"
    >
      <ul class="list-group">
        <li class="list-group-item">
          <div class="center">
            <img v-bind:src="articles.picture" />
          </div>
          <h5>{{ articles.name }}</h5>
          <a>{{ articles.price }} €</a>
          <a>{{ articles.detail }}</a>
        </li>
      </ul>
      <div class="center">
        <button class="green_button styled_button center">Ajouter</button>
      </div>
    </div>
  </div>
</template>

<script>
import DataService from "../services/DataService";
import axios from "axios";

let restaurantId = "";
let articles = "";
let listOfArticles = [];
let cart = [];
// let totalPrice = "";
// let validation = "";

export default {
  name: "articles-list",
  data() {
    return {
      articles: [],
      currentArticle: null,
      currentIndex: -1,
      title: "",
      restaurantId: "",
      listOfArticles: [],
      cart: [],
      idClient: "",
      idRestaurant: "",
      articlesCart: [],
      state: "commande",
      validation: "",
      totalPrice: "0",
    };
  },
  methods: {
    // to get all
    retrieveArticles() {
      //   console.log(restaurantId);
      listOfArticles = [];
      DataService.getOneRestaurant(restaurantId)
        .then((response) => {
          articles = response.data.restaurant.articles;
          //   console.log(articles);
          articles.forEach((element) => {
            console.log(element);
            DataService.getOneArticle(element)
              .then((response) => {
                listOfArticles.push(response.data.article);
                console.log(listOfArticles);
              })
              .catch((e) => {
                console.log(e);
              });
            this.articles = listOfArticles;
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    emptyCart() {
      this.cart = [];
      this.totalPrice = 0;
      console.log(cart);
    },
    createOrder() {
      console.log(restaurantId);
      console.log(this.cart);
      const idClient = "62bc06825573eae121135afa";

      if (Object.keys(this.cart).length !== 0) {
        axios.post("http://localhost:3000/api/orders/create", {
          idClient: idClient,
          idRestaurant: restaurantId,
          articles: this.cart,
          state: "commande",
        });
        this.emptyCart();
        this.validation = "Votre commande a bien été validée";
      }
    },
    refreshList() {
      this.retrieveArticles();
      this.currentArticle = null;
      this.currentIndex = -1;
    },
    addArticleToCart(article, index) {
      this.currentArticle = article;
      this.currentIndex = index;
      console.log(this.currentArticle._id);
      this.cart.push(this.currentArticle._id);
      console.log(this.cart);
      this.totalPrice = Math.floor(this.totalPrice) + this.currentArticle.price;
      console.log(this.totalPrice);
    },
    reload() {
      location.reload();
    },
    scrollToTop() {
      window.scrollTo(0, 0);
    },
    getRestaurantId() {
      restaurantId = this.$route.params.id;
      //   console.log(restaurantId);
    },
  },
  mounted() {
    this.getRestaurantId();
    this.retrieveArticles();
  },
};
</script>

<style scoped>
.space_bottom {
  margin-bottom: 20px;
}
</style>
