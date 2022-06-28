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
          <h4>{{ articles.name }}</h4>
          <a>{{ articles.price }}</a>
          <a>{{ articles.detail }}</a>
        </li>
      </ul>
    </div>
    <button @click="test()">test</button>
  </div>
</template>

<script>
// import DataService from "../services/DataService";
// export default {
//   name: "articles-list",
//   methods: {
//     test() {
//       console.log(this.$route.params.id);
//     },
//   },
//   props: {
//     listofarticles: Object,
//   },
// };

import DataService from "../services/DataService";
export default {
  name: "articles-list",
  data() {
    return {
      articles: [],
      currentArticle: null,
      currentIndex: -1,
      title: "",
    };
  },
  methods: {
    // to get all
    retrieveArticles() {
      DataService.getAllArticles()
        .then((response) => {
          this.articles = response.data.articles;
          console.log(response.data.articles);
        })
        .catch((e) => {
          console.log(e);
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
    test() {
      console.log(this.$route.params.id);
    },
  },
  mounted() {
    this.retrieveArticles();
  },
};
</script>
