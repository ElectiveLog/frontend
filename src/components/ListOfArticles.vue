<template>
  <div class="row">
    <div>
      <router-link to="/">
        <b-icon-arrow-left
          class="icon"
          font-scale="1.5"
          shift-v="1"
        ></b-icon-arrow-left
      ></router-link>
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
          <div class="center responsive_img">
            <img v-bind:src="articles.picture" />
          </div>
          <h5>{{ articles.name }}</h5>
          <a>{{ articles.price }} €</a>
          <a>{{ articles.detail }}</a>
          <div class="center">
            <button class="green_button styled_button center">Ajouter</button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import DataService from "../services/DataService";
import axios from "axios";
import jwt_decode from "jwt-decode";
const user = JSON.parse(localStorage.getItem("user"));

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
      totalPrice: "0"
    };
  },
  methods: {
    decodeToken(token) {
      return jwt_decode(token);
    },
    // to get all
    retrieveArticles() {
      this.payloadUser = this.decodeToken(user.accessToken);
      this.idClient = this.payloadUser.userId;
      //   console.log(restaurantId);
      listOfArticles = [];
      DataService.getOneRestaurant(restaurantId)
        .then(response => {
          articles = response.data.restaurant.articles;
          //   console.log(articles);
          articles.forEach(element => {
            console.log(element);
            DataService.getOneArticle(element)
              .then(response => {
                listOfArticles.push(response.data.article);
                console.log(listOfArticles);
              })
              .catch(e => {
                console.log(e);
              });
            this.articles = listOfArticles;
          });
        })
        .catch(error => {
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
      this.$socket.emit("OrderCreate", "1");
      var configLog = {
        method: "post",
        url: window.location.origin.split(":80")[0] + ":8080/api/logs/create",
        headers: {
          "X-Server-Select": "mongo"
        },
        data: {
          type: "Création",
          description:
            "Création d'une commande par un client : " +
            this.idClient +
            " pour le restaurant : " +
            restaurantId
        }
      };
      axios(configLog)
        .then(response => {
          console.log(JSON.stringify(response.data));
        })
        .catch(error => {
          console.log(error);
        });
      axios.post(
        window.location.origin.split(":80")[0] + ":8080/api/orders/create",
        {
          idClient: this.idClient,
          idRestaurant: restaurantId,
          articles: this.cart,
          state: "commande"
        },
        {
          headers: {
            "X-Server-Select": "mongo"
          }
        }
      );
      this.emptyCart();
      this.validation = "Votre commande a bien été validée";
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
    }
  },
  mounted() {
    this.getRestaurantId();
    this.retrieveArticles();
  }
};
</script>

<style scoped>
.space_bottom {
  margin-bottom: 20px;
}

@media screen and (max-width: 600px) {
  .responsive_img {
    width: 200px;
  }
}
</style>
