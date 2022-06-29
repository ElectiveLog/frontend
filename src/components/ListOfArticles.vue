<template>
  <div class="row">
    <div
      id="mouseover"
      class="col-md-4 effect"
      v-for="(articles, index) in articles"
      :key="index"
    >
      <ul class="list-group">
        <li class="list-group-item">
          <div class="center">
            <img v-bind:src="articles.picture" />
          </div>
          <h5>{{ articles.name }}</h5>
          <a>{{ articles.price }} €</a>
          <a>{{ articles.detail }}</a>
          <button class="green_button styled_button">Ajouter</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import DataService from "../services/DataService";
let restaurantId = "";
let articles = "";
let listOfArticles = [];
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

    refreshList() {
      this.retrieveArticles();
      this.currentArticle = null;
      this.currentIndex = -1;
    },
    setActiveArticle(article, index) {
      this.currentArticle = article;
      this.currentIndex = index;
    },
    unsetActiveArticle() {
      this.currentArticle = null;
      this.currentIndex = null;
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
